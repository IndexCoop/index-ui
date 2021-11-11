import React, { useState, useEffect } from 'react'
import SetComponentsContext from "./SetComponentsContext"
import { getSetDetails } from "utils/setjsApi"
import useWallet from "hooks/useWallet"
import { provider } from "web3-core"
import { dpiTokenAddress, mviTokenAddress, bedTokenAddress, eth2xfliTokenAddress, btc2xfliTokenAddress, dataTokenAddress } from "constants/ethContractAddresses"
import BigNumber from "bignumber.js"
import { SetComponent } from "./SetComponent"
import { Position } from "set.js/dist/types/src/types"
import { Token, useTokenList } from "hooks/useTokenList"
import { fetchCoingeckoTokenPrice } from "utils/coingeckoApi"
import { CoinGeckoCoin, useCoinGeckoCoins } from "../../hooks/useCoinGeckoCoins"

const ASSET_PLATFORM = 'ethereum'
const VS_CURRENCY = 'usd'

const SetComponentsProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: provider } = useWallet()
  const { tokenList } = useTokenList();
  const { coinList } = useCoinGeckoCoins();
  const [dpiComponents, setDpiComponents] = useState<SetComponent[]>([])
  const [mviComponents, setMviComponents] = useState<SetComponent[]>([])
  const [bedComponents, setBedComponents] = useState<SetComponent[]>([])
  const [eth2xfliComponents, setEth2xfliComponents] = useState<SetComponent[]>([])
  const [btc2xfliComponents, setBtc2xfliComponents] = useState<SetComponent[]>([])
  const [dataComponents, setDataComponents] = useState<SetComponent[]>([])

  useEffect(() => {
    if (ethereum && dpiTokenAddress && mviTokenAddress && bedTokenAddress && eth2xfliTokenAddress && btc2xfliTokenAddress && dataTokenAddress && tokenList && coinList) {
      getSetDetails(ethereum, [dpiTokenAddress, mviTokenAddress, bedTokenAddress, eth2xfliTokenAddress, btc2xfliTokenAddress, dataTokenAddress]).then(async result => {

        const dpiResult = result[0]
        console.log(dpiResult.positions.map(d => d.component))
        const contractAddresses = dpiResult.positions.map(d => d.component).join(" ")
        fetch(`https://api.coingecko.com/api/v3/simple/token_price/${ASSET_PLATFORM}?vs_currencies=${VS_CURRENCY}&contract_addresses=${encodeURIComponent(contractAddresses)}`).then(result => console.log(`result: `, result))

        // const dpiCoins = dpi.positions.map(p => getTokenForPosition(tokenList, p)).map(t => getCoinForToken(coinList, t))
        // console.log(`dpiCoins: `, dpiCoins)
        // const dpiPositionTokens =
        // const dpiPositionPrices = await CoinGeckoClient.simple.price({ids: ), vs_currencies: 'usd'})
        // console.log(dpiPositions);
        const dpi = result[0].positions.map(async position => {
          return await convertPositionToSetComponent(dpiTokenAddress as string, position, tokenList)
        })
        const mvi = result[1].positions.map(async position => {
          return await convertPositionToSetComponent(mviTokenAddress as string, position, tokenList)
        })
        const bed = result[2].positions.map(async position => {
          return await convertPositionToSetComponent(bedTokenAddress as string, position, tokenList)
        })
        const eth2xfli = result[3].positions.map(async position => {
          return await convertPositionToSetComponent(eth2xfliTokenAddress as string, position, tokenList)
        })
        const btc2xfli = result[4].positions.map(async position => {
          return await convertPositionToSetComponent(btc2xfliTokenAddress as string, position, tokenList)
        })
        const data = result[5].positions.map(async position => {
          return await convertPositionToSetComponent(dataTokenAddress as string, position, tokenList)
        })

        Promise.all(dpi).then(sortPositionsByPercentOfSet).then(setDpiComponents)
        Promise.all(mvi).then(sortPositionsByPercentOfSet).then(setMviComponents)
        Promise.all(bed).then(sortPositionsByPercentOfSet).then(setBedComponents)
        Promise.all(eth2xfli).then(sortPositionsByPercentOfSet).then(setEth2xfliComponents)
        Promise.all(btc2xfli).then(sortPositionsByPercentOfSet).then(setBtc2xfliComponents)
        Promise.all(data).then(sortPositionsByPercentOfSet).then(setDataComponents)
      })
    }
  }, [ethereum, tokenList, coinList])

  return (
    <SetComponentsContext.Provider
      value={{
        dpiComponents: dpiComponents,
        mviComponents: mviComponents,
        bedComponents: bedComponents,
        eth2xfliComponents: eth2xfliComponents,
        btc2xfliComponents: btc2xfliComponents,
        dataComponents: dataComponents,
      }}
    >
      {children}
    </SetComponentsContext.Provider>
  )
}

async function convertPositionToSetComponent(setAddress: string, position: Position, tokenList: Token[]): Promise<SetComponent> {
  const token = getTokenForPosition(tokenList, position)
  const quantity = new BigNumber(position.unit.toString()).div(new BigNumber(10).pow(18));
  const totalPriceUsd = quantity.multipliedBy(await fetchCoingeckoTokenPrice(position.component, 'usd'));
  const setPriceUsd = await fetchCoingeckoTokenPrice(setAddress, 'usd');
  const percentOfSet = totalPriceUsd.dividedBy(setPriceUsd).multipliedBy(100)

  return {
    address: position.component,
    id: token.name.toLowerCase(),
    quantity: quantity.toString(),
    symbol: token.symbol,
    name: token.name,
    image: token.logoURI,
    totalPriceUsd: totalPriceUsd.toString(),
    percentOfSet: percentOfSet.toPrecision(3).toString(),
    percentOfSetNumber: percentOfSet,
  }
}

function getTokenForPosition(tokenList: Token[], position: Position): Token {
  const matchingTokens = tokenList.filter(t => t.address.toLowerCase() === position.component.toLowerCase())
  if (matchingTokens.length === 0) {
    console.warn(`No token for position ${position.component} exists in token lists`)
  } else if (matchingTokens.length > 1) {
    console.warn(`Multiple tokens for position ${position.component} exist in token lists`)
  }
  return matchingTokens[0]
}

function getCoinForToken(coinList: CoinGeckoCoin[], token: Token) {
  const matchingCoins = coinList.filter(c => c.name.toLowerCase() === token.name.toLowerCase())
  if (matchingCoins.length === 0) {
    console.warn(`No coins for token ${token.name} exists in coin list`)
  } else if (matchingCoins.length > 1) {
    console.warn(`Multiple coins for token ${token.name} exist in coin list`)
  }
  return matchingCoins[0]
}

function sortPositionsByPercentOfSet(components: SetComponent[]): SetComponent[] {
  return components.sort((a, b) => b.percentOfSetNumber.comparedTo(a.percentOfSetNumber))
}

export default SetComponentsProvider

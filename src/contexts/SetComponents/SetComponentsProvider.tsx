import React, { useState, useEffect } from 'react'
import SetComponentsContext from "./SetComponentsContext"
import { getSetDetails } from "utils/setjsApi"
import useWallet from "hooks/useWallet"
import { provider } from "web3-core"
import { dpiTokenAddress, mviTokenAddress, bedTokenAddress, eth2xfliTokenAddress, btc2xfliTokenAddress, dataTokenAddress } from "constants/ethContractAddresses"
import BigNumber from "bignumber.js"
import { SetComponent } from "./SetComponent"
import { Position, SetDetails } from "set.js/dist/types/src/types"
import { Token, useTokenList } from "hooks/useTokenList"
import { CoinGeckoCoin, useCoinGeckoCoins } from "../../hooks/useCoinGeckoCoins"
import usePrices from "hooks/usePrices"

const ASSET_PLATFORM = 'ethereum'
const VS_CURRENCY = 'usd'

const SetComponentsProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: provider } = useWallet()
  const { tokenList } = useTokenList();
  const { dpiPrice, mviPrice, bedPrice, eth2xfliPrice, btc2xfliPrice, dataPrice } = usePrices();
  const [dpiComponents, setDpiComponents] = useState<SetComponent[]>([])
  const [mviComponents, setMviComponents] = useState<SetComponent[]>([])
  const [bedComponents, setBedComponents] = useState<SetComponent[]>([])
  const [eth2xfliComponents, setEth2xfliComponents] = useState<SetComponent[]>([])
  const [btc2xfliComponents, setBtc2xfliComponents] = useState<SetComponent[]>([])
  const [dataComponents, setDataComponents] = useState<SetComponent[]>([])

  useEffect(() => {
    if (ethereum && dpiTokenAddress && mviTokenAddress && bedTokenAddress && eth2xfliTokenAddress && btc2xfliTokenAddress && dataTokenAddress && tokenList && dpiPrice) {
      getSetDetails(ethereum, [dpiTokenAddress, mviTokenAddress, bedTokenAddress, eth2xfliTokenAddress, btc2xfliTokenAddress, dataTokenAddress]).then(async result => {
        const [dpi, mvi, bed, eth2xfli, btc2xfli, data] = result;

        const dpiComponentPrices = await getPositionPrices(dpi)
        const dpiPositions = dpi.positions.map(async position => {
          return await convertPositionToSetComponent(position, tokenList, dpiComponentPrices[position.component.toLowerCase()]?.usd, dpiPrice)
        })
        Promise.all(dpiPositions).then(sortPositionsByPercentOfSet).then(setDpiComponents)

        const mviComponentPrices = await getPositionPrices(mvi)
        const mviPositions = mvi.positions.map(async position => {
          return await convertPositionToSetComponent(position, tokenList, mviComponentPrices[position.component.toLowerCase()]?.usd, mviPrice)
        })
        Promise.all(mviPositions).then(sortPositionsByPercentOfSet).then(setMviComponents)

        // const bed = result[2].positions.map(async position => {
        //   return await convertPositionToSetComponent(bedTokenAddress as string, position, tokenList)
        // })
        // const eth2xfli = result[3].positions.map(async position => {
        //   return await convertPositionToSetComponent(eth2xfliTokenAddress as string, position, tokenList)
        // })
        // const btc2xfli = result[4].positions.map(async position => {
        //   return await convertPositionToSetComponent(btc2xfliTokenAddress as string, position, tokenList)
        // })
        // const data = result[5].positions.map(async position => {
        //   return await convertPositionToSetComponent(dataTokenAddress as string, position, tokenList)
        // })

        // Promise.all(mvi).then(sortPositionsByPercentOfSet).then(setMviComponents)
        // Promise.all(bed).then(sortPositionsByPercentOfSet).then(setBedComponents)
        // Promise.all(eth2xfli).then(sortPositionsByPercentOfSet).then(setEth2xfliComponents)
        // Promise.all(btc2xfli).then(sortPositionsByPercentOfSet).then(setBtc2xfliComponents)
        // Promise.all(data).then(sortPositionsByPercentOfSet).then(setDataComponents)
      })
    }
  }, [ethereum, tokenList, dpiPrice])

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

async function convertPositionToSetComponent(position: Position, tokenList: Token[], componentPriceUsd: number, setPriceUsd: number): Promise<SetComponent> {
  const token = getTokenForPosition(tokenList, position)
  const quantity = new BigNumber(position.unit.toString()).div(new BigNumber(10).pow(18));
  const totalPriceUsd = quantity.multipliedBy(componentPriceUsd);
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

function sortPositionsByPercentOfSet(components: SetComponent[]): SetComponent[] {
  return components.sort((a, b) => b.percentOfSetNumber.comparedTo(a.percentOfSetNumber))
}

function getPositionPrices(setDetails: SetDetails): Promise<any> {
  const componentAddresses = setDetails.positions.map(p => p.component)
  return fetch(`https://api.coingecko.com/api/v3/simple/token_price/${ASSET_PLATFORM}?vs_currencies=${VS_CURRENCY}&contract_addresses=${componentAddresses}`)
    .then(response => response.json())
    .catch(e => console.error(e))
}




export default SetComponentsProvider

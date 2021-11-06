import React, { useState, useEffect } from 'react'
import IndexComponent from "components/IndexComponent"
import SetComponentsContext from "./SetComponentsContext"
import { getSetDetails } from "utils/setjsApi"
import useWallet from "hooks/useWallet"
import { provider } from "web3-core"
import { dpiTokenAddress, mviTokenAddress, bedTokenAddress, eth2xfliTokenAddress, btc2xfliTokenAddress, dataTokenAddress } from "../../constants/ethContractAddresses"
import BigNumber from "bignumber.js"
import { SetComponent } from "./SetComponent"
import { Position } from "set.js/dist/types/src/types"
import { Token, useTokenList } from "../../hooks/useTokenList"
import { fetchCoingeckoTokenPrice } from "../../utils/coingeckoApi"

const SetComponentsProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: provider } = useWallet()
  const {tokenList} = useTokenList();
  const [dpiSetComponents, setDpiSetComponents] = useState<SetComponent[]>([])
  const [mviComponents, setMviComponents] = useState<SetComponent[]>([])

  useEffect(() => {
    if (ethereum && dpiTokenAddress && mviTokenAddress && bedTokenAddress && eth2xfliTokenAddress && btc2xfliTokenAddress && dataTokenAddress && tokenList) {
      getSetDetails(ethereum, [dpiTokenAddress, mviTokenAddress, bedTokenAddress, eth2xfliTokenAddress, btc2xfliTokenAddress, dataTokenAddress]).then(result => {
        const dpi = result[0].positions.map(async position => {
          return await convertPositionToSetComponent(dpiTokenAddress as string, position, tokenList)
        })
        const mvi = result[1].positions.map(async position => {
          return await convertPositionToSetComponent(mviTokenAddress as string, position, tokenList)
        })

        Promise.all(dpi).then(setDpiSetComponents)
        Promise.all(mvi).then(setMviComponents)
      })
    }
  }, [ethereum, tokenList])

  return (
    <SetComponentsContext.Provider
      value={{
        dpiSetComponents: dpiSetComponents,
        mviComponents: mviComponents
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
  const percentOfSet = totalPriceUsd.dividedBy(setPriceUsd).multipliedBy(100).toPrecision(3)

  return {
    address: position.component,
    id: token.name.toLowerCase(),
    quantity: quantity.toString(),
    symbol: token.symbol,
    name: token.name,
    image: token.logoURI,
    totalPriceUsd: totalPriceUsd.toString(),
    percentOfSet: percentOfSet.toString(),
    dailyPercentChange: '10',
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

export default SetComponentsProvider

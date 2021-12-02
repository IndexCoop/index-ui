import React, { useState, useEffect } from 'react'
import { provider } from 'web3-core'
import BigNumber from 'bignumber.js'
import { Position, SetDetails } from 'set.js/dist/types/src/types'

import SetComponentsContext from './SetComponentsContext'
import { SetComponent } from './SetComponent'
import { getSetDetails } from 'utils/setjsApi'
import {
  dpiTokenAddress,
  mviTokenAddress,
  bedTokenAddress,
  eth2xfliTokenAddress,
  btc2xfliTokenAddress,
  dataTokenAddress,
} from 'constants/ethContractAddresses'
import usePrices from 'hooks/usePrices'
import { Token, useTokenList } from 'hooks/useTokenList'
import useWallet from 'hooks/useWallet'
import { getProvider, getWeb3ReactProvider } from 'constants/provider'
import Web3 from 'web3'

const ASSET_PLATFORM = 'ethereum'
const VS_CURRENCY = 'usd'

const SetComponentsProvider: React.FC = ({ children }) => {
  //const { ethereum }: { ethereum: provider } = useWallet()
  const { tokenList } = useTokenList()
  const {
    dpiPrice,
    mviPrice,
    bedPrice,
    eth2xfliPrice,
    btc2xfliPrice,
    dataPrice,
  } = usePrices()
  const [dpiComponents, setDpiComponents] = useState<SetComponent[]>([])
  const [mviComponents, setMviComponents] = useState<SetComponent[]>([])
  const [bedComponents, setBedComponents] = useState<SetComponent[]>([])
  const [eth2xfliComponents, setEth2xfliComponents] = useState<SetComponent[]>(
    []
  )
  const [btc2xfliComponents, setBtc2xfliComponents] = useState<SetComponent[]>(
    []
  )
  const [dataComponents, setDataComponents] = useState<SetComponent[]>([])
  //const provider = getProvider()
  const provider = getWeb3ReactProvider().currentProvider

  useEffect(() => {
    if (
      provider &&
      dpiTokenAddress &&
      mviTokenAddress &&
      bedTokenAddress &&
      eth2xfliTokenAddress &&
      btc2xfliTokenAddress &&
      dataTokenAddress &&
      tokenList &&
      dpiPrice
    ) {
      getSetDetails(provider, [
        dpiTokenAddress,
        mviTokenAddress,
        bedTokenAddress,
        eth2xfliTokenAddress,
        btc2xfliTokenAddress,
        dataTokenAddress,
      ]).then(async (result) => {
        const [dpi, mvi, bed, eth2xfli, btc2xfli, data] = result

        const dpiComponentPrices = await getPositionPrices(dpi)
        const dpiPositions = dpi.positions.map(async (position) => {
          return await convertPositionToSetComponent(
            position,
            tokenList,
            dpiComponentPrices[position.component.toLowerCase()]?.usd,
            dpiPrice
          )
        })
        Promise.all(dpiPositions)
          .then(sortPositionsByPercentOfSet)
          .then(setDpiComponents)

        const mviComponentPrices = await getPositionPrices(mvi)
        const mviPositions = mvi.positions.map(async (position) => {
          return await convertPositionToSetComponent(
            position,
            tokenList,
            mviComponentPrices[position.component.toLowerCase()]?.usd,
            mviPrice
          )
        })
        Promise.all(mviPositions)
          .then(sortPositionsByPercentOfSet)
          .then(setMviComponents)

        const bedComponentPrices = await getPositionPrices(bed)
        const bedPositions = bed.positions.map(async (position) => {
          return await convertPositionToSetComponent(
            position,
            tokenList,
            bedComponentPrices[position.component.toLowerCase()]?.usd,
            bedPrice
          )
        })
        Promise.all(bedPositions)
          .then(sortPositionsByPercentOfSet)
          .then(setBedComponents)

        const eth2xfliComponentPrices = await getPositionPrices(eth2xfli)
        const eth2xfliPositions = eth2xfli.positions.map(async (position) => {
          return await convertPositionToSetComponent(
            position,
            tokenList,
            eth2xfliComponentPrices[position.component.toLowerCase()]?.usd,
            eth2xfliPrice
          )
        })
        Promise.all(eth2xfliPositions)
          .then(sortPositionsByPercentOfSet)
          .then(setEth2xfliComponents)

        const btc2xfliComponentPrices = await getPositionPrices(btc2xfli)
        const btc2xfliPositions = btc2xfli.positions.map(async (position) => {
          return await convertPositionToSetComponent(
            position,
            tokenList,
            btc2xfliComponentPrices[position.component.toLowerCase()]?.usd,
            btc2xfliPrice
          )
        })
        Promise.all(btc2xfliPositions)
          .then(sortPositionsByPercentOfSet)
          .then(setBtc2xfliComponents)

        const dataComponentPrices = await getPositionPrices(data)
        const dataPositions = data.positions.map(async (position) => {
          return await convertPositionToSetComponent(
            position,
            tokenList,
            dataComponentPrices[position.component.toLowerCase()]?.usd,
            dataPrice
          )
        })
        Promise.all(dataPositions)
          .then(sortPositionsByPercentOfSet)
          .then(setDataComponents)
      })
    }
  }, [
    provider,
    tokenList,
    dpiPrice,
    mviPrice,
    bedPrice,
    eth2xfliPrice,
    btc2xfliPrice,
    dataPrice,
  ])

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

async function convertPositionToSetComponent(
  position: Position,
  tokenList: Token[],
  componentPriceUsd: number,
  setPriceUsd: number
): Promise<SetComponent> {
  const token = getTokenForPosition(tokenList, position)
  const quantity = new BigNumber(position.unit.toString()).div(
    new BigNumber(10).pow(token.decimals)
  )
  const totalPriceUsd = quantity.multipliedBy(componentPriceUsd)
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
  const matchingTokens = tokenList.filter(
    (t) => t.address.toLowerCase() === position.component.toLowerCase()
  )
  if (matchingTokens.length === 0) {
    console.warn(
      `No token for position ${position.component} exists in token lists`
    )
  } else if (matchingTokens.length > 1) {
    console.warn(
      `Multiple tokens for position ${position.component} exist in token lists`
    )
  }
  return matchingTokens[0]
}

function sortPositionsByPercentOfSet(
  components: SetComponent[]
): SetComponent[] {
  return components.sort((a, b) =>
    b.percentOfSetNumber.comparedTo(a.percentOfSetNumber)
  )
}

function getPositionPrices(setDetails: SetDetails): Promise<any> {
  const componentAddresses = setDetails.positions.map((p) => p.component)
  return fetch(
    `https://api.coingecko.com/api/v3/simple/token_price/${ASSET_PLATFORM}?vs_currencies=${VS_CURRENCY}&contract_addresses=${componentAddresses}`
  )
    .then((response) => response.json())
    .catch((e) => console.error(e))
}

export default SetComponentsProvider

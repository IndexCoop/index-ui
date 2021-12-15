import React, { useEffect,useState } from 'react'

import BigNumber from 'bignumber.js'
import {
  CoinGeckoCoinPrices,
  Position,
  SetDetails,
} from 'set.js/dist/types/src/types'
import { provider } from 'web3-core'

import {
  bedTokenAddress,
  btc2xfliTokenAddress,
  dataTokenAddress,
  dpiTokenAddress,
  dpiTokenPolygonAddress,
  eth2xflipTokenAddress,
  eth2xfliTokenAddress,
  mviTokenAddress,
  mviTokenPolygonAddress,
} from 'constants/ethContractAddresses'
import { productTokensBySymbol } from 'constants/productTokens'
import usePrices from 'hooks/usePrices'
import { Token, useTokenList } from 'hooks/useTokenList'
import useWallet from 'hooks/useWallet'
import { MAINNET_CHAIN_DATA, POLYGON_CHAIN_DATA } from 'utils/connectors'
import { getSetDetails } from 'utils/setjsApi'
import { fetchSetComponentsBeta } from 'utils/tokensetsApi'

import { SetComponent } from './SetComponent'
import SetComponentsContext from './SetComponentsContext'

const ASSET_PLATFORM = 'ethereum'
const VS_CURRENCY = 'usd'

const SetComponentsProvider: React.FC = ({ children }) => {
  const { tokenList } = useTokenList()
  const {
    dpiPrice,
    mviPrice,
    bedPrice,
    eth2xfliPrice,
    btc2xfliPrice,
    dataPrice,
    eth2xflipPrice,
  } = usePrices()
  const [dpiComponents, setDpiComponents] = useState<SetComponent[]>([])
  const [mviComponents, setMviComponents] = useState<SetComponent[]>([])
  const [bedComponents, setBedComponents] = useState<SetComponent[]>([])
  const [eth2xfliComponents, setEth2xfliComponents] = useState<SetComponent[]>(
    []
  )
  const [eth2xflipComponents, setEth2xflipComponents] = useState<
    SetComponent[]
  >([])
  const [btc2xfliComponents, setBtc2xfliComponents] = useState<SetComponent[]>(
    []
  )
  const [dataComponents, setDataComponents] = useState<SetComponent[]>([])
  const { ethereum: provider, chainId } = useWallet()

  useEffect(() => {
    if (
      chainId &&
      chainId === MAINNET_CHAIN_DATA.chainId &&
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
      getSetDetails(
        provider,
        [
          dpiTokenAddress,
          mviTokenAddress,
          bedTokenAddress,
          eth2xfliTokenAddress,
          btc2xfliTokenAddress,
          dataTokenAddress,
        ],
        chainId
      ).then(async (result) => {
        const [dpi, mvi, bed, eth2xfli, btc2xfli, data] = result

        const dpiComponentPrices = await getPositionPrices(dpi)
        const dpiPositions = dpi.positions.map(async (position) => {
          return await convertPositionToSetComponent(
            position,
            tokenList,
            dpiComponentPrices[position.component.toLowerCase()]?.[VS_CURRENCY],
            dpiComponentPrices[position.component.toLowerCase()]?.[
              `${VS_CURRENCY}_24h_change`
            ],
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
            mviComponentPrices[position.component.toLowerCase()]?.[VS_CURRENCY],
            mviComponentPrices[position.component.toLowerCase()]?.[
              `${VS_CURRENCY}_24h_change`
            ],
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
            bedComponentPrices[position.component.toLowerCase()]?.[VS_CURRENCY],
            bedComponentPrices[position.component.toLowerCase()]?.[
              `${VS_CURRENCY}_24h_change`
            ],
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
            eth2xfliComponentPrices[position.component.toLowerCase()]?.[
              VS_CURRENCY
            ],
            eth2xfliComponentPrices[position.component.toLowerCase()]?.[
              `${VS_CURRENCY}_24h_change`
            ],
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
            btc2xfliComponentPrices[position.component.toLowerCase()]?.[
              VS_CURRENCY
            ],
            btc2xfliComponentPrices[position.component.toLowerCase()]?.[
              `${VS_CURRENCY}_24h_change`
            ],
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
            dataComponentPrices[position.component.toLowerCase()]?.[
              VS_CURRENCY
            ],
            dataComponentPrices[position.component.toLowerCase()]?.[
              `${VS_CURRENCY}_24h_change`
            ],
            dataPrice
          )
        })
        Promise.all(dataPositions)
          .then(sortPositionsByPercentOfSet)
          .then(setDataComponents)
      })

      fetchSetComponentsBeta(productTokensBySymbol['ETH2x-FLI-P'].tokensetsId)
        .then((data) => {
          const setComponents = (data && data.components) || []
          setEth2xflipComponents(setComponents)
        })
        .catch((err) => console.log(err))
    } else if (
      chainId &&
      chainId === POLYGON_CHAIN_DATA.chainId &&
      provider &&
      dpiTokenPolygonAddress &&
      mviTokenPolygonAddress &&
      eth2xflipTokenAddress &&
      tokenList &&
      dpiPrice
    ) {
      fetchSetComponentsBeta(productTokensBySymbol['ETH2x-FLI-P'].tokensetsId)
        .then((data) => {
          const setComponents = (data && data.components) || []
          setEth2xflipComponents(setComponents)
        })
        .catch((err) => console.log(err))

      // TODO: Replace Tokensets API (above) with SetJS call directly (below)
      //   const ethFlipComponentPrices = await getPositionPrices(ethflip)
      //   const ethFlipPositions = ethflip.positions.map(async (position) => {
      //     return await convertPositionToSetComponent(
      //       position,
      //       tokenList,
      //       ethFlipComponentPrices[position.component.toLowerCase()]?.[
      //         VS_CURRENCY
      //       ],
      //       ethFlipComponentPrices[position.component.toLowerCase()]?.[
      //         `${VS_CURRENCY}_24h_change`
      //       ],
      //       eth2xflipPrice
      //     )
      //   })
      //   Promise.all(ethFlipPositions)
      //     .then(sortPositionsByPercentOfSet)
      //     .then(setMviComponents)
      // })
    }
  }, [
    provider,
    tokenList,
    dpiPrice,
    mviPrice,
    chainId,
    bedPrice,
    eth2xfliPrice,
    btc2xfliPrice,
    dataPrice,
    eth2xflipPrice,
  ])

  return (
    <SetComponentsContext.Provider
      value={{
        dpiComponents: dpiComponents,
        mviComponents: mviComponents,
        bedComponents: bedComponents,
        eth2xfliComponents: eth2xfliComponents,
        eth2xflipComponents: eth2xflipComponents,
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
  componentPriceChangeUsd: number,
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
    dailyPercentChange: componentPriceChangeUsd.toString(),
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

function getPositionPrices(
  setDetails: SetDetails
): Promise<CoinGeckoCoinPrices> {
  const componentAddresses = setDetails.positions.map((p) => p.component)
  return fetch(
    `https://api.coingecko.com/api/v3/simple/token_price/${ASSET_PLATFORM}?vs_currencies=${VS_CURRENCY}&contract_addresses=${componentAddresses}&include_24hr_change=true`
  )
    .then((response) => response.json())
    .catch((e) => console.error(e))
}

export default SetComponentsProvider

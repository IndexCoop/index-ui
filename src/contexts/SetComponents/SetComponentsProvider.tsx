import React, { useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import {
  CoinGeckoCoinPrices,
  Position,
  SetDetails,
} from 'set.js/dist/types/src/types'

import {
  bedTokenAddress,
  btc2xfliTokenAddress,
  dataTokenAddress,
  dpiTokenAddress,
  dpiTokenPolygonAddress,
  eth2xflipTokenAddress,
  eth2xfliTokenAddress,
  gmiTokenAddress,
  iethflipTokenAddress,
  imaticflipTokenAddress,
  matic2xflipTokenAddress,
  mviTokenAddress,
  mviTokenPolygonAddress,
} from 'constants/ethContractAddresses'
import usePrices from 'hooks/usePrices'
import useWallet from 'hooks/useWallet'
import { MAINNET_CHAIN_DATA, POLYGON_CHAIN_DATA } from 'utils/connectors'
import { getSetDetails } from 'utils/setjsApi'
import { getTokenList, TokenData as Token } from 'utils/tokenlists'

import { SetComponent } from './SetComponent'
import SetComponentsContext from './SetComponentsContext'

const ASSET_PLATFORM = 'ethereum'
const VS_CURRENCY = 'usd'

const SetComponentsProvider: React.FC = ({ children }) => {
  const {
    dpiPrice,
    mviPrice,
    bedPrice,
    gmiPrice,
    eth2xfliPrice,
    btc2xfliPrice,
    dataPrice,
    eth2xflipPrice,
    matic2xflipPrice,
    imaticflipPrice,
    iethflipPrice,
  } = usePrices()
  const [dpiComponents, setDpiComponents] = useState<SetComponent[]>([])
  const [mviComponents, setMviComponents] = useState<SetComponent[]>([])
  const [bedComponents, setBedComponents] = useState<SetComponent[]>([])
  const [gmiComponents, setGmiComponents] = useState<SetComponent[]>([])
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
  const [iethflipComponents, setIEthflipComponents] = useState<SetComponent[]>(
    []
  )
  const [matic2xflipComponents, setMatic2xflipComponents] = useState<
    SetComponent[]
  >([])
  const [imaticflipComponents, setIMaticflipComponents] = useState<
    SetComponent[]
  >([])

  const { ethereum: provider, chainId } = useWallet()
  const tokenList = getTokenList(chainId)

  useEffect(() => {
    if (
      chainId &&
      chainId === MAINNET_CHAIN_DATA.chainId &&
      provider &&
      dpiTokenAddress &&
      mviTokenAddress &&
      bedTokenAddress &&
      gmiTokenAddress &&
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
          gmiTokenAddress,
          eth2xfliTokenAddress,
          btc2xfliTokenAddress,
          dataTokenAddress,
        ],
        chainId
      ).then(async (result) => {
        const [dpi, mvi, bed, gmi, eth2xfli, btc2xfli, data] = result

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

        const gmiComponentPrices = await getPositionPrices(gmi)
        const gmiPositions = gmi.positions.map(async (position) => {
          return await convertPositionToSetComponent(
            position,
            tokenList,
            gmiComponentPrices[position.component.toLowerCase()]?.[VS_CURRENCY],
            gmiComponentPrices[position.component.toLowerCase()]?.[
              `${VS_CURRENCY}_24h_change`
            ],
            gmiPrice
          )
        })
        Promise.all(gmiPositions)
          .then(sortPositionsByPercentOfSet)
          .then(setGmiComponents)

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
    }
  }, [
    provider,
    tokenList,
    dpiPrice,
    mviPrice,
    chainId,
    bedPrice,
    gmiPrice,
    eth2xfliPrice,
    btc2xfliPrice,
    dataPrice,
    eth2xflipPrice,
  ])

  useEffect(() => {
    if (
      chainId &&
      chainId === POLYGON_CHAIN_DATA.chainId &&
      provider &&
      dpiTokenPolygonAddress &&
      mviTokenPolygonAddress &&
      eth2xflipTokenAddress &&
      iethflipTokenAddress &&
      matic2xflipTokenAddress &&
      imaticflipTokenAddress &&
      tokenList
    ) {
      getSetDetails(
        provider,
        [
          eth2xflipTokenAddress,
          iethflipTokenAddress,
          matic2xflipTokenAddress,
          imaticflipTokenAddress,
        ],
        chainId
      )
        .then(async (result) => {
          const [ethflip, iethflip, maticflip, imaticflip] = result

          const ethFlipComponentPrices = await getPositionPrices(
            ethflip,
            'polygon-pos'
          )
          const ethFlipPositions = ethflip.positions.map(async (position) => {
            return await convertPositionToSetComponent(
              position,
              tokenList,
              ethFlipComponentPrices[position.component.toLowerCase()]?.[
                VS_CURRENCY
              ],
              ethFlipComponentPrices[position.component.toLowerCase()]?.[
                `${VS_CURRENCY}_24h_change`
              ],
              eth2xflipPrice
            )
          })
          Promise.all(ethFlipPositions)
            .then(sortPositionsByPercentOfSet)
            .then(setEth2xflipComponents)

          const iethFlipComponentPrices = await getPositionPrices(
            iethflip,
            'polygon-pos'
          )
          const iethFlipPositions = iethflip.positions.map(async (position) => {
            return await convertPositionToSetComponent(
              position,
              tokenList,
              iethFlipComponentPrices[position.component.toLowerCase()]?.[
                VS_CURRENCY
              ],
              iethFlipComponentPrices[position.component.toLowerCase()]?.[
                `${VS_CURRENCY}_24h_change`
              ],
              iethflipPrice
            )
          })
          Promise.all(iethFlipPositions)
            .then(sortPositionsByPercentOfSet)
            .then(setIEthflipComponents)

          const maticFlipComponentPrices = await getPositionPrices(
            maticflip,
            'polygon-pos'
          )
          const maticFliPositions = maticflip.positions.map(
            async (position) => {
              return await convertPositionToSetComponent(
                position,
                tokenList,
                maticFlipComponentPrices[position.component.toLowerCase()]?.[
                  VS_CURRENCY
                ],
                maticFlipComponentPrices[position.component.toLowerCase()]?.[
                  `${VS_CURRENCY}_24h_change`
                ],
                matic2xflipPrice
              )
            }
          )
          Promise.all(maticFliPositions)
            .then(sortPositionsByPercentOfSet)
            .then(setMatic2xflipComponents)

          const imaticFlipComponentPrices = await getPositionPrices(
            imaticflip,
            'polygon-pos'
          )
          const imaticFlipPositions = imaticflip.positions.map(
            async (position) => {
              return await convertPositionToSetComponent(
                position,
                tokenList,
                imaticFlipComponentPrices[position.component.toLowerCase()]?.[
                  VS_CURRENCY
                ],
                imaticFlipComponentPrices[position.component.toLowerCase()]?.[
                  `${VS_CURRENCY}_24h_change`
                ],
                imaticflipPrice
              )
            }
          )
          Promise.all(imaticFlipPositions)
            .then(sortPositionsByPercentOfSet)
            .then(setIMaticflipComponents)
        })
        .catch((err) => console.log('err', err))
    }
  }, [
    chainId,
    provider,
    tokenList,
    iethflipPrice,
    imaticflipPrice,
    matic2xflipPrice,
  ])

  return (
    <SetComponentsContext.Provider
      value={{
        dpiComponents: dpiComponents,
        mviComponents: mviComponents,
        bedComponents: bedComponents,
        gmiComponents: gmiComponents,
        eth2xfliComponents: eth2xfliComponents,
        eth2xflipComponents: eth2xflipComponents,
        btc2xfliComponents: btc2xfliComponents,
        dataComponents: dataComponents,
        iEthFlipComponents: iethflipComponents,
        iMaticFlipComponents: imaticflipComponents,
        matic2xFlipComponents: matic2xflipComponents,
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
  if (token === undefined) {
    return {
      address: position.component,
      id: position.component,
      quantity: '',
      symbol: 'SYM',
      name: position.component,
      image: '',
      totalPriceUsd: '0',
      dailyPercentChange: '0',
      percentOfSet: '0',
      percentOfSetNumber: new BigNumber('0'),
    }
  }

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

async function getPositionPrices(
  setDetails: SetDetails,
  assetPlatform: string = ASSET_PLATFORM
): Promise<CoinGeckoCoinPrices> {
  const componentAddresses = setDetails.positions.map((p) => p.component)
  return fetch(
    `https://api.coingecko.com/api/v3/simple/token_price/${assetPlatform}?vs_currencies=${VS_CURRENCY}&contract_addresses=${componentAddresses}&include_24hr_change=true`
  )
    .then((response) => response.json())
    .catch((e) => console.error(e))
}

export default SetComponentsProvider

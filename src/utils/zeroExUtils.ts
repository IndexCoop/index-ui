import axios from 'axios'
import querystring from 'querystring'
import BigNumber from 'utils/bignumber'

import { tokenInfo } from 'constants/tokenInfo'
import { ZeroExData } from '../contexts/BuySell/types'

export const getZeroExTradeData = async (
  isExactInput: boolean,
  isUserBuying: boolean,
  currencyToken: string,
  buySellToken: string,
  buySellAmount: string
): Promise<ZeroExData> => {
  let sellToken
  let buyToken

  if (isUserBuying) {
    buyToken = buySellToken
    sellToken = currencyToken
  } else {
    buyToken = currencyToken
    sellToken = buySellToken
  }

  const params = getApiParams(isExactInput, sellToken, buyToken, buySellAmount)
  const resp = await axios.get(
    `https://api.0x.org/swap/v1/quote?${querystring.stringify(params)}`
  )

  const zeroExData: ZeroExData = resp.data
  return processApiResult(
    zeroExData,
    isExactInput,
    sellToken,
    buySellToken,
    buySellAmount
  )
}

const getApiParams = (
  isExactInput: boolean,
  sellToken: string,
  buyToken: string,
  buySellAmount: string
): any => {
  const params: any = {
    sellToken: tokenInfo[sellToken].address,
    buyToken: tokenInfo[buyToken].address,
    excludedSources: 'MultiHop', // MultiHop is usually not worth the gas price
  }

  if (isExactInput) {
    params.sellAmount = getDecimalAdjustedAmount(
      buySellAmount,
      tokenInfo[sellToken].decimals
    )
  } else {
    params.buyAmount = getDecimalAdjustedAmount(
      buySellAmount,
      tokenInfo[buyToken].decimals
    )
  }

  return params
}

const processApiResult = (
  zeroExData: ZeroExData,
  isExactInput: boolean,
  sellToken: string,
  buyToken: string,
  buySellAmount: string
): ZeroExData => {
  zeroExData.displaySellAmount = getDisplayAdjustedAmount(
    zeroExData.sellAmount,
    tokenInfo[sellToken].decimals
  )
  zeroExData.displayBuyAmount = getDisplayAdjustedAmount(
    zeroExData.buyAmount,
    tokenInfo[buyToken].decimals
  )

  const guaranteedPrice = parseFloat(zeroExData.guaranteedPrice)
  zeroExData.minOutput = isExactInput
    ? guaranteedPrice * zeroExData.displaySellAmount
    : parseFloat(buySellAmount)
  zeroExData.maxInput = isExactInput
    ? parseFloat(buySellAmount)
    : guaranteedPrice * zeroExData.displayBuyAmount

  zeroExData.formattedSources = formatSources(zeroExData.sources)

  return zeroExData
}

export const getDisplayAdjustedAmount = (
  amount: string,
  decimals: number
): number => {
  return new BigNumber(amount)
    .dividedBy(new BigNumber('1e' + decimals))
    .toNumber()
}

const formatSources = (
  sources: { name: string; proportion: string }[]
): string => {
  const activeSources: any[] = []

  sources.forEach((source: any) => {
    if (source.proportion !== '0') activeSources.push(source)
  })
  const sourceNames: string[] = activeSources.map((source) =>
    source.name.replaceAll('_', ' ')
  )

  return sourceNames.length === 1
    ? sourceNames[0]
    : sourceNames.slice(0, -1).join(', ') + ' and ' + sourceNames.slice(-1)
}

const getDecimalAdjustedAmount = (amount: string, decimals: number): number => {
  return new BigNumber(amount)
    .multipliedBy(new BigNumber('1e' + decimals))
    .toNumber()
}

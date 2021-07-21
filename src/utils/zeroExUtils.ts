import axios from 'axios'
import querystring from 'querystring'
import BigNumber from 'utils/bignumber'

import { tokenInfo } from 'constants/tokenInfo'
import { ZeroExData } from '../contexts/BuySell/types'
import { fetchCoingeckoTokenPrice } from './coingeckoApi'

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
  return await processApiResult(
    zeroExData,
    isExactInput,
    sellToken,
    buyToken,
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

// Adds some additional information to the ZeroExData return object. This extra information is only used for display purposes, and
// will have no effect on the outcome of the transaction
const processApiResult = async (
  zeroExData: ZeroExData,
  isExactInput: boolean,
  sellToken: string,
  buyToken: string,
  buySellAmount: string
): Promise<ZeroExData> => {
  zeroExData.displaySellAmount = getDisplayAdjustedAmount(
    zeroExData.sellAmount,
    tokenInfo[sellToken].decimals
  )
  zeroExData.displayBuyAmount = getDisplayAdjustedAmount(
    zeroExData.buyAmount,
    tokenInfo[buyToken].decimals
  )

  const guaranteedPrice = new BigNumber(zeroExData.guaranteedPrice)
  zeroExData.minOutput = isExactInput
    ? guaranteedPrice
        .multipliedBy(new BigNumber(zeroExData.sellAmount))
        .dividedBy(new BigNumber('1e' + tokenInfo[sellToken].decimals))
    : new BigNumber(buySellAmount)
  zeroExData.maxInput = isExactInput
    ? new BigNumber(buySellAmount)
    : guaranteedPrice
        .multipliedBy(new BigNumber(zeroExData.buyAmount))
        .dividedBy(new BigNumber('1e' + tokenInfo[buyToken].decimals))

  zeroExData.formattedSources = formatSources(zeroExData.sources)

  //TODO: decouple getting proper price for zeroExUtils
  const buyTokenPrice = await fetchCoingeckoTokenPrice(
    zeroExData.buyTokenAddress
  )
  zeroExData.buyTokenCost = (
    buyTokenPrice * zeroExData.displayBuyAmount
  ).toFixed(2)

  const sellTokenPrice: number = await fetchCoingeckoTokenPrice(
    zeroExData.sellTokenAddress
  )
  zeroExData.sellTokenCost = (
    sellTokenPrice * zeroExData.displaySellAmount
  ).toFixed(2)

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

const getDecimalAdjustedAmount = (amount: string, decimals: number): string => {
  return new BigNumber(amount)
    .multipliedBy(new BigNumber('1e' + decimals))
    .toString()
}

import axios from 'axios'
import querystring from 'querystring'
import BigNumber from 'utils/bignumber'

import { polygonTokenInfo, tokenInfo } from 'constants/tokenInfo'
import { ZeroExData } from '../contexts/BuySell/types'
import { fetchCoingeckoTokenPrice } from './coingeckoApi'
import { fetchSetComponents } from './tokensetsApi'
import { MAINNET_CHAIN_DATA, POLYGON_CHAIN_DATA } from './connectors'
import { utils } from 'ethers'
//@ts-ignore
import qs from 'qs'

const API_QUOTE_URL = 'https://api.0x.org/swap/v1/quote'
async function getQuote(params: any) {
  const url = `${API_QUOTE_URL}?${qs.stringify(params)}`
  console.log(`Getting quote from ${params.sellToken} to ${params.buyToken}`)
  console.log('Sending quote request to:', url)
  const response = await axios(url)
  return response.data
}

export async function getExchangeIssuanceZeroExTradeData(
  isUserBuying: boolean,
  currencyToken: string,
  buySellToken: string,
  buySellAmount: string,
  chainId: number,
  setComponents: any
) {
  // const componentKey = buySellToken + 'Components'
  // const components = setComponents[componentKey]
  console.log('Fetching set components')
  const components = await fetchSetComponents(buySellToken)
  console.log('Response', components)
  const parsedCurrencyToken = currencyToken === 'ETH' ? 'WETH' : currencyToken
  const promises = components.map(
    ({
      symbol,
      address,
      decimals,
      quantity,
    }: {
      symbol: string
      address: string
      decimals: number
      quantity: string
    }) => {
      console.log(address)
      console.log('Quantity: ', quantity)
      console.log('Decimals: ', decimals)
      console.log('buySellAmount: ', buySellAmount)
      const componentAmount = utils
        .parseEther(buySellAmount)
        .div(10 ** 9)
        .mul(utils.parseUnits(quantity, decimals))
        .div(10 ** 9)
      const buyToken = isUserBuying ? address : parsedCurrencyToken
      const sellToken = isUserBuying ? parsedCurrencyToken : address
      const params: any = { buyToken, sellToken }
      if (isUserBuying) params.buyAmount = componentAmount.toString()
      else params.sellAmount = componentAmount.toString()
      console.log('Params', params)
      console.log('Sumbol and currency token', symbol, currencyToken)
      if (symbol === parsedCurrencyToken) {
        return Promise.resolve({
          ...params,
          swapCallData: utils.formatBytes32String('FOOBAR'),
        })
      } else {
          return getQuote(params).then((result)  => result)
      }
    }
  )
  const quotes = await Promise.all(promises)
  console.log('Quotes', quotes)
}

export const getZeroExTradeData = async (
  isExactInput: boolean,
  isUserBuying: boolean,
  currencyToken: string,
  buySellToken: string,
  buySellAmount: string,
  chainId: number
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

  const params = getApiParams(
    isExactInput,
    sellToken,
    buyToken,
    buySellAmount,
    chainId
  )
  let resp
  if (chainId === MAINNET_CHAIN_DATA.chainId)
    resp = await axios.get(
      `https://api.0x.org/swap/v1/quote?${querystring.stringify(params)}`
    )
  else
    resp = await axios.get(
      `https://polygon.api.0x.org/swap/v1/quote?${querystring.stringify(
        params
      )}`
    )

  const zeroExData: ZeroExData = resp.data
  return await processApiResult(
    zeroExData,
    isExactInput,
    sellToken,
    buyToken,
    buySellAmount,
    chainId
  )
}

const getApiParams = (
  isExactInput: boolean,
  sellToken: string,
  buyToken: string,
  buySellAmount: string,
  chainId: number
): any => {
  let params: any
  if (chainId === MAINNET_CHAIN_DATA.chainId) {
    params = {
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
  } else {
    params = {
      sellToken: polygonTokenInfo[sellToken].address,
      buyToken: polygonTokenInfo[buyToken].address,
    }
    if (isExactInput) {
      params.sellAmount = getDecimalAdjustedAmount(
        buySellAmount,
        polygonTokenInfo[sellToken].decimals
      )
    } else {
      params.buyAmount = getDecimalAdjustedAmount(
        buySellAmount,
        polygonTokenInfo[buyToken].decimals
      )
    }
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
  buySellAmount: string,
  chainId: number
): Promise<ZeroExData> => {
  const tokenInfoByChain =
    chainId === POLYGON_CHAIN_DATA.chainId ? polygonTokenInfo : tokenInfo

  zeroExData.displaySellAmount = getDisplayAdjustedAmount(
    zeroExData.sellAmount,
    tokenInfoByChain[sellToken].decimals
  )
  zeroExData.displayBuyAmount = getDisplayAdjustedAmount(
    zeroExData.buyAmount,
    tokenInfoByChain[buyToken].decimals
  )

  const guaranteedPrice = new BigNumber(zeroExData.guaranteedPrice)
  zeroExData.minOutput = isExactInput
    ? guaranteedPrice
        .multipliedBy(new BigNumber(zeroExData.sellAmount))
        .dividedBy(new BigNumber('1e' + tokenInfoByChain[sellToken].decimals))
    : new BigNumber(buySellAmount)
  zeroExData.maxInput = isExactInput
    ? new BigNumber(buySellAmount)
    : guaranteedPrice
        .multipliedBy(new BigNumber(zeroExData.buyAmount))
        .dividedBy(new BigNumber('1e' + tokenInfoByChain[buyToken].decimals))

  zeroExData.formattedSources = formatSources(zeroExData.sources)

  const buyTokenPrice = await fetchCoingeckoTokenPrice(
    zeroExData.buyTokenAddress,
    chainId
  )
  zeroExData.buyTokenCost = (
    buyTokenPrice * zeroExData.displayBuyAmount
  ).toFixed(2)

  const sellTokenPrice: number = await fetchCoingeckoTokenPrice(
    zeroExData.sellTokenAddress,
    chainId
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

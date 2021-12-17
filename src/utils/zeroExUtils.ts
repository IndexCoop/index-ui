import axios from 'axios'
import querystring from 'querystring'
import BigNumber from 'utils/bignumber'

import { polygonTokenInfo, tokenInfo } from 'constants/tokenInfo'
import { ZeroExData } from '../contexts/BuySell/types'
import { fetchCoingeckoTokenPrice } from './coingeckoApi'
import { fetchSetComponents } from './tokensetsApi'
import { POLYGON_CHAIN_DATA } from './connectors'
import { ethers, utils } from 'ethers'
//@ts-ignore
import qs from 'qs'

const API_QUOTE_URL = 'https://api.0x.org/swap/v1/quote'

const SLIPPAGE_PERCENTS = 1
const slippagePercentage = SLIPPAGE_PERCENTS / 100

export type ZeroExQuote = {
  buyToken: string
  sellToken: string
  buyAmount?: string
  sellAmount?: string
  gas: string
  gasPrice: string
  sources: { name: string; proportion: string }[]
  to: string
  from: string
  decimals: number
  data: string
  sellTokenAddress: string
  buyTokenAddress: string
}

async function getQuote(
  params: any,
  retryCount: number = 0
): Promise<ZeroExQuote> {
  const url = `${API_QUOTE_URL}?${qs.stringify(params)}`
  console.log(
    `RETRY: ${retryCount} - Getting quote from ${params.sellToken} to ${params.buyToken}`
  )
  const response = await axios(url)
  return response.data
}

async function getQuotes(
  isUserBuying: boolean,
  currencyToken: string,
  buySellToken: string,
  buySellAmount: string,
  chainId: number,
  isCurrentUpdate: () => boolean
): Promise<ZeroExQuote[]> {
  console.log('Fetching set components')
  const components = await fetchSetComponents(buySellToken)
  console.log('Response', components)
  const quotes: ZeroExQuote[] = []
  const parsedCurrencyToken = currencyToken === 'ETH' ? 'WETH' : currencyToken
  for (const { symbol, address, decimals, quantity } of components) {
    if (!isCurrentUpdate()) return []
    console.log(address)
    const componentAmount = utils
      .parseEther(buySellAmount)
      .div(10 ** 9)
      .mul(utils.parseUnits(quantity, decimals))
      .div(10 ** 9)
    const buyToken = isUserBuying ? address : parsedCurrencyToken
    const sellToken = isUserBuying ? parsedCurrencyToken : address
    if (symbol === parsedCurrencyToken) {
      // If the currency token is one of the components we don't have to swap at all
      quotes.push({
        buyToken: address,
        buyTokenAddress: address,
        sellToken: address,
        sellTokenAddress: address,
        buyAmount: componentAmount.toString(),
        sellAmount: componentAmount.toString(),
        data: utils.formatBytes32String('FOOBAR'),
        gas: '0',
        gasPrice: '0',
        sources: [],
        to: '',
        from: '',
        decimals,
      })
    } else {
      const params: any = { buyToken, sellToken, chainId, slippagePercentage }
      if (isUserBuying) params.buyAmount = componentAmount.toString()
      else params.sellAmount = componentAmount.toString()
      const quote = await getQuote(params)
      quotes.push({ ...quote, decimals })
    }
  }
  return quotes
}

export function convertQuotesToZeroExData(
  buySellAmount: string,
  isUserBuying: boolean,
  quotes: ZeroExQuote[],
  currencyToken: string,
  buySellToken: string
): ZeroExData {
  const buySellAmountParsed = utils.parseEther(buySellAmount)
  let buyAmount = isUserBuying ? buySellAmountParsed : ethers.BigNumber.from(0)
  const currencyTokenDecimals = tokenInfo[currencyToken].decimals

  let buyTokenDecimals = isUserBuying ? 18 : currencyTokenDecimals
  let sellAmount = isUserBuying ? ethers.BigNumber.from(0) : buySellAmountParsed
  let sellTokenDecimals = isUserBuying ? currencyTokenDecimals : 18

  let gas = 0
  let gasCostTotal = ethers.BigNumber.from(0)
  const sourcesAmounts: Record<string, ethers.BigNumber> = {}
  const result: ZeroExData = {
    price: '',
    guaranteedPrice: '',
    buyTokenAddress: '',
    sellTokenAddress: '',
    buyAmount: '',
    sellAmount: '',
    to: '',
    from: '',
    sources: [{ name: '', proportion: '' }],
    displayBuyAmount: 0,
    displaySellAmount: 0,
    minOutput: new BigNumber(0),
    maxInput: new BigNumber(0),
    gas: '',
    gasPrice: '',
    formattedSources: '',
    buyTokenCost: '',
    sellTokenCost: '',
  }

  for (const quote of quotes) {
    const additionalSellAmount = ethers.BigNumber.from(quote.sellAmount)
    const additionalBuyAmount = ethers.BigNumber.from(quote.buyAmount)
    if (isUserBuying) {
      sellAmount = sellAmount.add(additionalSellAmount)
    } else {
      buyAmount = buyAmount.add(additionalBuyAmount)
    }

    gas = gas + parseInt(quote.gas)
    const newGasCost = ethers.BigNumber.from(quote.gasPrice).mul(quote.gas)
    gasCostTotal = gasCostTotal.add(newGasCost)

    if (result.to === '' && quote.to !== '') result.to = quote.to
    if (result.from === '' && quote.to !== '') result.from = quote.from

    const additionalBuySellAmount = isUserBuying
      ? additionalSellAmount
      : additionalBuyAmount
    for (const source of quote.sources) {
      if (source.proportion === '0') continue
      const proportionPercent = Math.round(parseFloat(source.proportion) * 100)
      const additionalAmount = ethers.BigNumber.from(additionalBuySellAmount)
        .mul(proportionPercent)
        .div(100)

      if (source.name in sourcesAmounts)
        sourcesAmounts[source.name] = additionalAmount.add(
          sourcesAmounts[source.name]
        )
      else sourcesAmounts[source.name] = additionalAmount
    }

    result.gas = gas.toString()
    result.gasPrice = gasCostTotal.gt(0)
      ? gasCostTotal.div(gas).toString()
      : '0'
    result.buyAmount = buyAmount.toString()
    result.sellAmount = sellAmount.toString()

    const sourceProportionTotal = isUserBuying ? sellAmount : buyAmount
    result.sources = Object.entries(sourcesAmounts).map(([key, value]) => {
      return {
        name: key,
        proportion: (
          value.mul(100).div(sourceProportionTotal).toNumber() / 100
        ).toString(),
      }
    })
    console.log('Aggregated data before processing', result)

    // TODO: Adjust
    const pricePrecision = 10 ** 6
    result.guaranteedPrice = buyAmount
      .mul(pricePrecision)
      .div(sellAmount)
      .div(pricePrecision)
      .toString()
  }
  console.log('Aggregated data before processing', result)

  result.displaySellAmount = getDisplayAdjustedAmount(
    result.sellAmount,
    sellTokenDecimals
  )
  result.displayBuyAmount = getDisplayAdjustedAmount(
    result.buyAmount,
    buyTokenDecimals
  )

  if (isUserBuying) {
    result.maxInput = new BigNumber(
      sellAmount
        .mul(100)
        .div(100 - SLIPPAGE_PERCENTS)
        .toString()
    ).dividedBy(10 ** sellTokenDecimals)
  } else {
    result.minOutput = new BigNumber(
      buyAmount
        .mul(100 - SLIPPAGE_PERCENTS)
        .div(100)
        .toString()
    ).dividedBy(10 ** buyTokenDecimals)
  }

  result.formattedSources = formatSources(result.sources)

  result.sellTokenAddress = isUserBuying ? currencyToken : buySellToken

  console.log('Aggregated data after processing', result)
  return result
}

export async function getExchangeIssuanceZeroExTradeData(
  isUserBuying: boolean,
  currencyToken: string,
  buySellToken: string,
  buySellAmount: string,
  chainId: number,
  isCurrentUpdate: () => boolean
) {
  // const componentKey = buySellToken + 'Components'
  // const components = setComponents[componentKey]

  const quotes = await getQuotes(
    isUserBuying,
    currencyToken,
    buySellToken,
    buySellAmount,
    chainId,
    isCurrentUpdate
  )

  console.log('Quotes', quotes)
  return quotes
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
  if (chainId === POLYGON_CHAIN_DATA.chainId)
    resp = await axios.get(
      `https://polygon.api.0x.org/swap/v1/quote?${querystring.stringify(
        params
      )}`
    )
  else
    resp = await axios.get(
      `https://api.0x.org/swap/v1/quote?${querystring.stringify(params)}`
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
  if (chainId === POLYGON_CHAIN_DATA.chainId) {
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
  } else {
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

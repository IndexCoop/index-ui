import axios from 'axios'
import { tokenInfo } from 'constants/tokenInfo'
import querystring from 'querystring'
import BigNumber from 'utils/bignumber'
import { ZeroExData } from './types'

export const getZeroExTradeData = async (
  isExactInput: boolean,
  sellToken: string,
  buyToken: string,
  amount: string
): Promise<ZeroExData> => {
  const params: any = {
    sellToken: tokenInfo[sellToken].address,
    buyToken: tokenInfo[buyToken].address,
  }

  if (isExactInput) {
    params.sellAmount = getDecimalAdjustedAmount(
      amount,
      tokenInfo[sellToken].decimals
    )
  } else {
    params.buyAmount = getDecimalAdjustedAmount(
      amount,
      tokenInfo[buyToken].decimals
    )
  }

  const resp = await axios.get(
    `https://api.0x.org/swap/v1/quote?${querystring.stringify(params)}`
  )
  const zeroExData: ZeroExData = resp.data

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
    : parseFloat(amount)
  zeroExData.maxInput = isExactInput
    ? parseFloat(amount)
    : guaranteedPrice * zeroExData.displayBuyAmount

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

const getDecimalAdjustedAmount = (amount: string, decimals: number): number => {
  return new BigNumber(amount)
    .multipliedBy(new BigNumber('1e' + decimals))
    .toNumber()
}

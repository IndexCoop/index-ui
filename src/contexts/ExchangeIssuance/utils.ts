import { IssuanceTradeType } from 'index-sdk/exchangeIssuance'
import { IssuancePriceData } from './types'
import {
  dpiTokenAddress,
  cgiTokenAddress,
  indexTokenAddress,
} from 'constants/ethContractAddresses'

export const getIssuanceTradeType = (
  isUserIssuing: boolean,
  selectedCurrency: string,
  IssuanceData: IssuancePriceData
): IssuanceTradeType => {
  if (isUserIssuing) {
    if (
      selectedCurrency !== 'wrapped_eth' &&
      IssuanceData.trade_type === 'exact_out'
    )
      return IssuanceTradeType.ISSUE_EXACT_SET_FROM_TOKEN
    else if (
      selectedCurrency !== 'wrapped_eth' &&
      IssuanceData.trade_type === 'exact_in'
    )
      return IssuanceTradeType.ISSUE_SET_FOR_EXACT_TOKEN
    else if (IssuanceData.trade_type === 'exact_out')
      return IssuanceTradeType.ISSUE_EXACT_SET_FROM_ETH
    return IssuanceTradeType.ISSUE_SET_FOR_EXACT_ETH
  } else if (selectedCurrency !== 'wrapped_eth')
    return IssuanceTradeType.REDEEM_EXACT_SET_FOR_TOKEN
  else return IssuanceTradeType.REDEEM_EXACT_SET_FOR_ETH
}

export const getIssuanceCallData = (
  tradeType: IssuanceTradeType,
  IssuanceData: IssuancePriceData,
  currencyTokenAddress: string,
  setToken: string
) => {
  const { amount_in, amount_out } = IssuanceData

  let setTokenAddress
  if (setToken === 'dpi') setTokenAddress = dpiTokenAddress
  else if (setToken === 'cgi') setTokenAddress = cgiTokenAddress
  else if (setToken === 'index') setTokenAddress = indexTokenAddress

  switch (tradeType) {
    case IssuanceTradeType.ISSUE_EXACT_SET_FROM_TOKEN:
    case IssuanceTradeType.ISSUE_SET_FOR_EXACT_TOKEN:
    case IssuanceTradeType.REDEEM_EXACT_SET_FOR_TOKEN:
      return [setTokenAddress, currencyTokenAddress, amount_in, amount_out]
    case IssuanceTradeType.REDEEM_EXACT_SET_FOR_ETH:
      return [setTokenAddress, amount_in, amount_out]

    // When paying with ETH, input amount should be included in msg.value
    case IssuanceTradeType.ISSUE_EXACT_SET_FROM_ETH:
      return [setTokenAddress, amount_in]
    case IssuanceTradeType.ISSUE_SET_FOR_EXACT_ETH:
      return [setTokenAddress, amount_out]

    default:
      return null
  }
}

export const getIssuanceTransactionOptions = (
  tradeType: IssuanceTradeType,
  IssuanceData: IssuancePriceData,
  userAddress: string
) => {
  const { gas_cost, gas_price, amount_in } = IssuanceData

  switch (tradeType) {
    case IssuanceTradeType.ISSUE_EXACT_SET_FROM_TOKEN:
    case IssuanceTradeType.ISSUE_SET_FOR_EXACT_TOKEN:
    case IssuanceTradeType.REDEEM_EXACT_SET_FOR_TOKEN:
    case IssuanceTradeType.REDEEM_EXACT_SET_FOR_ETH:
      return {
        from: userAddress,
        gasPrice: gas_price,
        gas: gas_cost,
      }

    // When paying with ETH, input amount should be included in msg.value
    case IssuanceTradeType.ISSUE_EXACT_SET_FROM_ETH:
    case IssuanceTradeType.ISSUE_SET_FOR_EXACT_ETH:
      return {
        from: userAddress,
        gasPrice: gas_price,
        gas: gas_cost,
        value: amount_in,
      }

    default:
      return null
  }
}

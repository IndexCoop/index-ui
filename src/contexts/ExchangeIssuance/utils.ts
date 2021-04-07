import { IssuanceTradeType } from 'index-sdk/exchangeIssuance'
import { IssuancePriceData } from './types'
import {
  dpiTokenAddress,
  cgiTokenAddress,
} from 'constants/ethContractAddresses'
import BigNumber from 'utils/bignumber'

export const getIssuanceTradeType = (
  isUserIssuing: boolean,
  selectedCurrency: string,
  IssuanceData: IssuancePriceData
): IssuanceTradeType => {
  if (isUserIssuing) {
    if (
      selectedCurrency !== 'wrapped_eth' &&
      IssuanceData.tradeType === 'exactOut'
    )
      return IssuanceTradeType.ISSUE_EXACT_SET_FROM_TOKEN
    else if (
      selectedCurrency !== 'wrapped_eth' &&
      IssuanceData.tradeType === 'exactIn'
    ) {
      return IssuanceTradeType.ISSUE_SET_FOR_EXACT_TOKEN
    } else if (IssuanceData.tradeType === 'exactOut') {
      return IssuanceTradeType.ISSUE_EXACT_SET_FROM_ETH
    }
    return IssuanceTradeType.ISSUE_SET_FOR_EXACT_ETH
  } else if (selectedCurrency !== 'wrapped_eth') {
    return IssuanceTradeType.REDEEM_EXACT_SET_FOR_TOKEN
  } else {
    return IssuanceTradeType.REDEEM_EXACT_SET_FOR_ETH
  }
}

export const getIssuanceCallData = (
  tradeType: IssuanceTradeType,
  IssuanceData: IssuancePriceData,
  currencyTokenAddress: string,
  setToken: string
) => {
  const { amountIn, amountOut } = IssuanceData

  let setTokenAddress
  if (setToken === 'dpi') setTokenAddress = dpiTokenAddress
  else if (setToken === 'cgi') setTokenAddress = cgiTokenAddress

  switch (tradeType) {
    case IssuanceTradeType.ISSUE_EXACT_SET_FROM_TOKEN:
    case IssuanceTradeType.ISSUE_SET_FOR_EXACT_TOKEN:
    case IssuanceTradeType.REDEEM_EXACT_SET_FOR_TOKEN:
      return [
        setTokenAddress,
        currencyTokenAddress,
        amountIn,
        new BigNumber(amountOut).dividedBy(new BigNumber(2)).toFixed(0),
      ]
    case IssuanceTradeType.REDEEM_EXACT_SET_FOR_ETH:
      return [
        setTokenAddress,
        amountIn,
        new BigNumber(amountOut).dividedBy(new BigNumber(2)).toFixed(0),
      ]

    // When paying with ETH, input amount should be included in msg.value
    case IssuanceTradeType.ISSUE_EXACT_SET_FROM_ETH:
      return [setTokenAddress, amountIn]
    case IssuanceTradeType.ISSUE_SET_FOR_EXACT_ETH:
      return [setTokenAddress, amountIn]

    default:
      return null
  }
}

export const getIssuanceTransactionOptions = (
  tradeType: IssuanceTradeType,
  IssuanceData: IssuancePriceData,
  userAddress: string
) => {
  const { amountIn, amountOut } = IssuanceData

  switch (tradeType) {
    case IssuanceTradeType.ISSUE_EXACT_SET_FROM_TOKEN:
    case IssuanceTradeType.ISSUE_SET_FOR_EXACT_TOKEN:
    case IssuanceTradeType.REDEEM_EXACT_SET_FOR_TOKEN:
    case IssuanceTradeType.REDEEM_EXACT_SET_FOR_ETH:
      return {
        from: userAddress,
      }

    // When paying with ETH, input amount should be included in msg.value
    case IssuanceTradeType.ISSUE_EXACT_SET_FROM_ETH:
      return {
        from: userAddress,
        value: amountOut,
      }
    case IssuanceTradeType.ISSUE_SET_FOR_EXACT_ETH:
      return {
        from: userAddress,
        value: amountIn,
      }

    default:
      return null
  }
}

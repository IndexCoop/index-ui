import { createContext } from 'react'
import BigNumber from 'utils/bignumber'
import { ZeroExData } from './types'
import { ZeroExQuote } from 'utils/zeroExUtils'

interface BuySellContextValues {
  buySellToken: string
  isFetchingOrderData: boolean
  isUserBuying: boolean
  isUsingExchangeIssuance: boolean
  isTokenSupportingExchangeIssuance: boolean
  activeField: 'currency' | 'set'
  selectedCurrency: any
  spendingTokenBalance: BigNumber
  zeroExTradeData: ZeroExData | undefined
  currencyOptions: any[]
  buySellQuantity: string
  onSetBuySellToken: (tokenId: string) => void
  onToggleIsUserBuying: () => void
  onToggleIsUsingExchangeIssuance: () => void
  onSetActiveField: (field: 'currency' | 'set') => void
  onSetSelectedCurrency: (selectedCurrency: any) => void
  onSetBuySellQuantity: (amount: string) => void
  onExecuteBuySell: () => void
  exchangeIssuanceQuotes: ZeroExQuote[]
}

const BuySellContext = createContext<BuySellContextValues>({
  buySellToken: 'dpi',
  isFetchingOrderData: false,
  isUserBuying: true,
  isUsingExchangeIssuance: false,
  isTokenSupportingExchangeIssuance: false,
  activeField: 'currency',
  selectedCurrency: undefined,
  spendingTokenBalance: new BigNumber(0),
  zeroExTradeData: undefined,
  currencyOptions: [],
  buySellQuantity: '0',
  onSetBuySellToken: () => {},
  onToggleIsUserBuying: () => {},
  onToggleIsUsingExchangeIssuance: () => {},
  onSetActiveField: () => {},
  onSetSelectedCurrency: () => {},
  onSetBuySellQuantity: () => {},
  onExecuteBuySell: () => {},
  exchangeIssuanceQuotes: [],
})

export default BuySellContext

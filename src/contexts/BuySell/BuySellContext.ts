import { createContext } from 'react'
import BigNumber from 'utils/bignumber'
import { ZeroExData, RequestStatus } from './types'
import { ZeroExQuote } from 'utils/zeroExUtils'

interface BuySellContextValues {
  buySellToken: string
  isFetchingOrderData: boolean
  isUserBuying: boolean
  requestStatus: RequestStatus
  isUsingExchangeIssuance: boolean
  isExchangeIssuanceSupported: boolean
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
  sellTokenAddress: string
}

const BuySellContext = createContext<BuySellContextValues>({
  buySellToken: 'dpi',
  isFetchingOrderData: false,
  isUserBuying: true,
  requestStatus: 'none',
  isUsingExchangeIssuance: false,
  isExchangeIssuanceSupported: false,
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
  sellTokenAddress: '',
})

export default BuySellContext

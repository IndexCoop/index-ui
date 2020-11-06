import { createContext } from 'react'
import { TransactionStatusType } from 'components/TransactionWatcher'

interface BuySellContextValues {
  isFetchingOrderData: boolean
  isUserBuying: boolean
  activeField: 'currency' | 'set'
  selectedCurrency: undefined
  currencyQuantity: number
  tokenQuantity: number
  currencyOptions: any[]
  uniswapData: any
  transactionStatusType: TransactionStatusType | undefined
  onToggleIsUserBuying: () => void
  onSetActiveField: (field: 'currency' | 'set') => void
  onSetSelectedCurrency: (selectedCurrency: any) => void
  onSetCurrencyQuantity: (event: any) => void
  onSetTokenQuantity: (event: any) => void
  onExecuteBuySell: () => void
}

const BuySellContext = createContext<BuySellContextValues>({
  isFetchingOrderData: false,
  isUserBuying: true,
  activeField: 'currency',
  selectedCurrency: undefined,
  currencyQuantity: 0,
  tokenQuantity: 0,
  currencyOptions: [],
  uniswapData: {},
  transactionStatusType: undefined,
  onToggleIsUserBuying: () => {},
  onSetActiveField: () => {},
  onSetSelectedCurrency: () => {},
  onSetCurrencyQuantity: () => {},
  onSetTokenQuantity: () => {},
  onExecuteBuySell: () => {},
})

export default BuySellContext

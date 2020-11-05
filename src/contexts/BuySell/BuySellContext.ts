import { createContext } from 'react'

interface BuySellContextValues {
  isViewingOrderSummary: boolean
  isFetchingOrderData: boolean
  isUserBuying: boolean
  activeField: 'currency' | 'token'
  selectedCurrency: undefined
  currencyQuantity: number
  tokenQuantity: number
  currencyOptions: any[]
  uniswapData: any
  onToggleIsViewingOrderSummary: () => void
  onToggleIsUserBuying: () => void
  onSetActiveField: (field: 'currency' | 'token') => void
  onSetSelectedCurrency: () => void
  onSetCurrencyQuantity: () => void
  onSetTokenQuantity: () => void
  onExecuteBuySell: () => void
}

const BuySellContext = createContext<BuySellContextValues>({
  isViewingOrderSummary: false,
  isFetchingOrderData: false,
  isUserBuying: true,
  activeField: 'currency',
  selectedCurrency: undefined,
  currencyQuantity: 0,
  tokenQuantity: 0,
  currencyOptions: [],
  uniswapData: {},
  onToggleIsViewingOrderSummary: () => {},
  onToggleIsUserBuying: () => {},
  onSetActiveField: () => {},
  onSetSelectedCurrency: () => {},
  onSetCurrencyQuantity: () => {},
  onSetTokenQuantity: () => {},
  onExecuteBuySell: () => {},
})

export default BuySellContext

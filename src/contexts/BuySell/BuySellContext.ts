import { createContext } from 'react'

interface BuySellContextValues {
  isFetchingOrderData: boolean
  isUserBuying: boolean
  activeField: 'currency' | 'set'
  selectedCurrency: undefined
  currencyQuantity: number | undefined
  tokenQuantity: number | undefined
  currencyOptions: any[]
  uniswapData: any
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
  currencyQuantity: undefined,
  tokenQuantity: undefined,
  currencyOptions: [],
  uniswapData: {},
  onToggleIsUserBuying: () => {},
  onSetActiveField: () => {},
  onSetSelectedCurrency: () => {},
  onSetCurrencyQuantity: () => {},
  onSetTokenQuantity: () => {},
  onExecuteBuySell: () => {},
})

export default BuySellContext

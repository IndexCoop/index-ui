import { createContext } from 'react'

interface BuySellContextValues {
  isViewingOrderSummary: boolean
  isFetchingOrderData: boolean
  activeField: 'currency' | 'token'
  selectedCurrency: undefined
  currencyQuantity: number
  tokenQuantity: number
  currencyOptions: any[]
  uniswapData: any
  onExecuteBuySell: () => void
}

const BuySellContext = createContext<BuySellContextValues>({
  isViewingOrderSummary: false,
  isFetchingOrderData: false,
  activeField: 'currency',
  selectedCurrency: undefined,
  currencyQuantity: 0,
  tokenQuantity: 0,
  currencyOptions: [],
  uniswapData: {},
  onExecuteBuySell: () => {},
})

export default BuySellContext

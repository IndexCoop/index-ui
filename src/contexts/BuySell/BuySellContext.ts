import { createContext } from 'react'
import { UniswapPriceData } from './types'

interface BuySellContextValues {
  buySellToken: 'dpi' | 'index'
  isFetchingOrderData: boolean
  isUserBuying: boolean
  activeField: 'currency' | 'set'
  selectedCurrency: any
  currencyQuantity: string | undefined
  tokenQuantity: string | undefined
  currencyOptions: any[]
  uniswapData: UniswapPriceData | undefined
  onSetBuySellToken: (tokenId: 'index' | 'dpi') => void
  onToggleIsUserBuying: () => void
  onSetActiveField: (field: 'currency' | 'set') => void
  onSetSelectedCurrency: (selectedCurrency: any) => void
  onSetCurrencyQuantity: (event: any) => void
  onSetTokenQuantity: (event: any) => void
  onExecuteBuySell: () => void
}

const BuySellContext = createContext<BuySellContextValues>({
  buySellToken: 'dpi',
  isFetchingOrderData: false,
  isUserBuying: true,
  activeField: 'currency',
  selectedCurrency: undefined,
  currencyQuantity: undefined,
  tokenQuantity: undefined,
  currencyOptions: [],
  uniswapData: undefined,
  onSetBuySellToken: () => {},
  onToggleIsUserBuying: () => {},
  onSetActiveField: () => {},
  onSetSelectedCurrency: () => {},
  onSetCurrencyQuantity: () => {},
  onSetTokenQuantity: () => {},
  onExecuteBuySell: () => {},
})

export default BuySellContext

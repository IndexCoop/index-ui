import { createContext } from 'react'
import { UniswapPriceData } from './types'
import BigNumber from 'utils/bignumber'

interface BuySellContextValues {
  buySellToken: string
  isFetchingOrderData: boolean
  isUserBuying: boolean
  activeField: 'currency' | 'set'
  selectedCurrency: any
  // currencyQuantity: string | undefined
  // tokenQuantity: string | undefined
  // currencyOptions: any[]
  spendingTokenBalance: BigNumber
  zeroExTradeData: any | undefined
  currencyOptions: any[]
  amount: string
  onSetBuySellToken: (tokenId: string) => void
  onToggleIsUserBuying: () => void
  onSetActiveField: (field: 'currency' | 'set') => void
  onSetSelectedCurrency: (selectedCurrency: any) => void
  onSetAmount: (amount: string) => void
  onExecuteBuySell: () => void
}

const BuySellContext = createContext<BuySellContextValues>({
  buySellToken: 'dpi',
  isFetchingOrderData: false,
  isUserBuying: true,
  activeField: 'currency',
  selectedCurrency: undefined,
  spendingTokenBalance: new BigNumber(0),
  zeroExTradeData: undefined,
  currencyOptions: [],
  amount: '0',
  onSetBuySellToken: () => {},
  onToggleIsUserBuying: () => {},
  onSetActiveField: () => {},
  onSetSelectedCurrency: () => {},
  onSetAmount: () => {},
  onExecuteBuySell: () => {},
})

export default BuySellContext

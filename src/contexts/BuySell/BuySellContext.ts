import { createContext } from 'react'
import BigNumber from 'utils/bignumber'
import { ZeroExData } from './types'

interface BuySellContextValues {
  buySellToken: string
  isFetchingOrderData: boolean
  isUserBuying: boolean
  activeField: 'currency' | 'set'
  selectedCurrency: any
  spendingTokenBalance: BigNumber
  zeroExTradeData: ZeroExData | undefined
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

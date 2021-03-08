import { createContext } from 'react'
import { IssuancePriceData } from './types'
import BigNumber from 'utils/bignumber'

interface ContextValues {
  issuanceToken: 'dpi' | 'index' | 'cgi'
  isFetchingOrderData: boolean
  isUserIssuing: boolean
  activeField: 'currency' | 'set'
  selectedCurrency: any
  currencyQuantity: string | undefined
  tokenQuantity: string | undefined
  currencyOptions: any[]
  spendingTokenBalance: BigNumber
  issuanceData: IssuancePriceData | undefined
  onSetIssuanceToken: (tokenId: 'index' | 'dpi' | 'cgi') => void
  onToggleIsUserIssuing: () => void
  onSetActiveField: (field: 'currency' | 'set') => void
  onSetSelectedCurrency: (selectedCurrency: any) => void
  onSetCurrencyQuantity: (event: any) => void
  onSetTokenQuantity: (event: any) => void
  onExecuteIssuance: () => void
}

const ExchangeIssuanceContext = createContext<ContextValues>({
  issuanceToken: 'dpi',
  isFetchingOrderData: false,
  isUserIssuing: true,
  activeField: 'currency',
  selectedCurrency: undefined,
  currencyQuantity: undefined,
  tokenQuantity: undefined,
  currencyOptions: [],
  spendingTokenBalance: new BigNumber(0),
  issuanceData: undefined,
  onSetIssuanceToken: () => {},
  onToggleIsUserIssuing: () => {},
  onSetActiveField: () => {},
  onSetSelectedCurrency: () => {},
  onSetCurrencyQuantity: () => {},
  onSetTokenQuantity: () => {},
  onExecuteIssuance: () => {},
})

export default ExchangeIssuanceContext

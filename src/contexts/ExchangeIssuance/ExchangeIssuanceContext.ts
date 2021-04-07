import { createContext } from 'react'
import { IssuancePriceData } from './types'
import BigNumber from 'utils/bignumber'

interface ContextValues {
  issuanceToken: 'dpi' | 'cgi'
  isFetchingOrderData: boolean
  isUserIssuing: boolean
  activeField: 'currency' | 'set'
  selectedCurrency: any
  currencyQuantity: string | undefined
  tokenQuantity: string | undefined
  currencyOptions: any[]
  spendingTokenBalance: BigNumber
  issuanceData: IssuancePriceData | undefined
  isIssuance: boolean
  onSetIssuanceToken: (tokenId: 'dpi' | 'cgi') => void
  onToggleIsUserIssuing: () => void
  onSetActiveField: (field: 'currency' | 'set') => void
  onSetSelectedCurrency: (selectedCurrency: any) => void
  onSetCurrencyQuantity: (event: any) => void
  onSetTokenQuantity: (event: any) => void
  onExecuteIssuance: () => void
  onSetIsIssuance: (isIssuance: boolean) => void
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
  isIssuance: false,
  onSetIssuanceToken: () => {},
  onToggleIsUserIssuing: () => {},
  onSetActiveField: () => {},
  onSetSelectedCurrency: () => {},
  onSetCurrencyQuantity: () => {},
  onSetTokenQuantity: () => {},
  onExecuteIssuance: () => {},
  onSetIsIssuance: () => {},
})

export default ExchangeIssuanceContext

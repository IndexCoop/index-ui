import React, { useState, useEffect, useCallback } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'utils/bignumber'
import ExchangeIssuanceContext from './ExchangeIssuanceContext'
import { fetchTokenBuySellData } from 'utils/tokensetsApi'
import useWallet from 'hooks/useWallet'
import useBalances from 'hooks/useBalances'
import useTransactionWatcher from 'hooks/useTransactionWatcher'
import { useDebounce } from 'hooks/useDebounce'
import { getIssuanceTradeTransaction } from 'index-sdk/exchangeIssuance'
import {
  getIssuanceTradeType,
  getIssuanceCallData,
  getIssuanceTransactionOptions,
} from './utils'
import trackReferral from 'utils/referralApi'
import { waitTransaction } from 'utils/index'
import { TransactionStatusType } from 'contexts/TransactionWatcher'
import { currencyTokens } from 'constants/currencyTokens'
import { IssuancePriceData } from './types'

const ExchangeIssuanceProvider: React.FC = ({ children }) => {
  const [issuanceToken, setIssuanceToken] = useState<'dpi' | 'index' | 'cgi'>(
    'dpi'
  )
  const [isFetchingOrderData, setIsFetchingOrderData] = useState<boolean>(false)
  const [isUserIssuing, setIsUserIssuing] = useState<boolean>(true)
  const [activeField, setActiveField] = useState<'currency' | 'set'>('currency')
  const [selectedCurrency, setSelectedCurrency] = useState<any>()
  const [currencyQuantity, setCurrencyQuantity] = useState<string>()
  const [tokenQuantity, setTokenQuantity] = useState<string>()
  const [currencyOptions, setCurrencyOptions] = useState<any[]>([])
  const [issuanceData, setIssuanceData] = useState<IssuancePriceData>(
    {} as IssuancePriceData
  )

  const { onSetTransactionId, onSetTransactionStatus } = useTransactionWatcher()

  const {
    ethBalance,
    dpiBalance,
    cgiBalance,
    indexBalance,
    daiBalance,
    usdcBalance,
  } = useBalances()

  const {
    account,
    ethereum,
  }: { account: string | null | undefined; ethereum: provider } = useWallet()

  useEffect(() => {
    setCurrencyOptions(currencyTokens)
    setSelectedCurrency(currencyTokens[0])
  }, [])

  let spendingTokenBalance = new BigNumber(0)
  if (!isUserIssuing && issuanceToken === 'index') {
    spendingTokenBalance = indexBalance || new BigNumber(0)
  } else if (!isUserIssuing && issuanceToken === 'dpi') {
    spendingTokenBalance = dpiBalance || new BigNumber(0)
  } else if (!isUserIssuing && issuanceToken === 'cgi') {
    spendingTokenBalance = cgiBalance || new BigNumber(0)
  } else if (selectedCurrency?.id === 'wrapped_eth') {
    spendingTokenBalance = ethBalance || new BigNumber(0)
  } else if (selectedCurrency?.id === 'mcd') {
    spendingTokenBalance = daiBalance || new BigNumber(0)
  } else if (selectedCurrency?.id === 'usdc') {
    spendingTokenBalance = usdcBalance || new BigNumber(0)
  }

  const debouncedCurrencyQuantity = useDebounce(currencyQuantity)
  const debouncedTokenQuantity = useDebounce(tokenQuantity)
  const targetTradeQuantity =
    activeField === 'currency'
      ? debouncedCurrencyQuantity
      : debouncedTokenQuantity

  useEffect(() => {
    if (!targetTradeQuantity) return

    setIsFetchingOrderData(true)
    fetchTokenBuySellData(
      issuanceToken,
      isUserIssuing,
      targetTradeQuantity,
      selectedCurrency?.id,
      activeField
    ).then((issuanceData: IssuancePriceData) => {
      setIsFetchingOrderData(false)

      if (!issuanceData) return setIssuanceData({} as any)

      setIssuanceData(issuanceData)

      // Populate the inactive field with API response
      if (isUserIssuing) {
        if (activeField === 'currency') {
          setTokenQuantity(issuanceData.display?.to_quantity)
        } else {
          setCurrencyQuantity(issuanceData.display?.from_quantity)
        }
      } else {
        setCurrencyQuantity(issuanceData.display?.to_quantity)
      }
    })
  }, [
    isUserIssuing,
    selectedCurrency,
    activeField,
    targetTradeQuantity,
    issuanceToken,
  ])

  const onExecuteIssuance = useCallback(async () => {
    if (!account || !issuanceData?.amount_in || !selectedCurrency) return

    let requiredBalance = new BigNumber(issuanceData?.amount_in).dividedBy(
      new BigNumber(10).pow(18)
    )

    if (selectedCurrency.id === 'usdc') {
      requiredBalance = new BigNumber(issuanceData?.amount_in || 0).dividedBy(
        new BigNumber(10).pow(6)
      )
    }

    if (spendingTokenBalance?.isLessThanOrEqualTo(requiredBalance)) return

    const issuanceTradeType = getIssuanceTradeType(
      isUserIssuing,
      selectedCurrency.id,
      issuanceData
    )
    const issuanceCallData = getIssuanceCallData(
      issuanceTradeType,
      issuanceData,
      selectedCurrency.address,
      issuanceToken
    )
    const transactionOptions = getIssuanceTransactionOptions(
      issuanceTradeType,
      issuanceData,
      account
    )

    if (!issuanceCallData || !transactionOptions) return

    const issuanceTradeTransaction = getIssuanceTradeTransaction(
      ethereum,
      issuanceTradeType,
      issuanceCallData,
      transactionOptions
    )

    try {
      onSetTransactionStatus(TransactionStatusType.IS_APPROVING)

      const transactionId = await issuanceTradeTransaction()

      onSetTransactionId(transactionId)
      onSetTransactionStatus(TransactionStatusType.IS_PENDING)

      const isSuccessful = await waitTransaction(ethereum, transactionId)
      const referralCode = window?.localStorage?.getItem('referral') || ''

      if (isSuccessful) {
        onSetTransactionStatus(TransactionStatusType.IS_COMPLETED)
        trackReferral(
          referralCode,
          transactionId as string,
          'COMPLETED',
          selectedCurrency.id,
          issuanceToken,
          isUserIssuing
        )
      } else {
        onSetTransactionStatus(TransactionStatusType.IS_FAILED)
        trackReferral(
          referralCode,
          transactionId as string,
          'PENDING OR FAILED',
          selectedCurrency.id,
          issuanceToken,
          isUserIssuing
        )
      }
    } catch (e) {
      onSetTransactionStatus(TransactionStatusType.IS_FAILED)
    }
  }, [
    account,
    isUserIssuing,
    issuanceData,
    selectedCurrency,
    issuanceToken,
    ethereum,
    onSetTransactionId,
    onSetTransactionStatus,
    spendingTokenBalance,
  ])

  const onToggleIsUserIssuing = () => {
    // If the user is switching to sell, ensure `set` field can only be selected.
    if (isUserIssuing) {
      onSetActiveField('set')
    }
    setIsUserIssuing(!isUserIssuing)
  }
  const onSetActiveField = (field: 'currency' | 'set') => setActiveField(field)
  const onSetCurrencyQuantity = (currencyQuantity: string) => {
    setCurrencyQuantity(currencyQuantity)
  }
  const onSetTokenQuantity = (tokenQuantity: string) => {
    setTokenQuantity(tokenQuantity)
  }
  const onSetSelectedCurrency = (currency: any) => {
    setSelectedCurrency(currency)
  }

  return (
    <ExchangeIssuanceContext.Provider
      value={{
        issuanceToken,
        isFetchingOrderData,
        isUserIssuing,
        activeField,
        selectedCurrency,
        currencyQuantity,
        tokenQuantity,
        currencyOptions,
        spendingTokenBalance,
        issuanceData,
        onSetIssuanceToken: setIssuanceToken,
        onToggleIsUserIssuing,
        onSetActiveField,
        onSetSelectedCurrency,
        onSetCurrencyQuantity,
        onSetTokenQuantity,
        onExecuteIssuance,
      }}
    >
      {children}
    </ExchangeIssuanceContext.Provider>
  )
}

export default ExchangeIssuanceProvider

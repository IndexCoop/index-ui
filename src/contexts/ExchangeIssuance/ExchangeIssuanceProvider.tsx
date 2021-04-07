import React, { useState, useEffect, useCallback } from 'react'
import { provider } from 'web3-core'
import Web3 from 'web3'

import BigNumber from 'utils/bignumber'
import ExchangeIssuanceContext from './ExchangeIssuanceContext'
import useWallet from 'hooks/useWallet'
import useBalances from 'hooks/useBalances'
import useTransactionWatcher from 'hooks/useTransactionWatcher'
import { useDebounce } from 'hooks/useDebounce'
import {
  getIssuanceTradeTransaction,
  getIssuanceTradeData,
  getIssuanceTradeEstimation,
} from 'index-sdk/exchangeIssuance'
import {
  getIssuanceTradeType,
  getIssuanceCallData,
  getIssuanceTransactionOptions,
} from './utils'
import { decToBn, bnToDec, getGasPrice } from 'utils'
import trackReferral from 'utils/referralApi'
import { waitTransaction } from 'utils/index'
import { TransactionStatusType } from 'contexts/TransactionWatcher'
import { currencyTokens } from 'constants/currencyTokens'
import { IssuancePriceData } from './types'

const ExchangeIssuanceProvider: React.FC = ({ children }) => {
  const [issuanceToken, setIssuanceToken] = useState<'dpi' | 'cgi'>('dpi')
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

  const [isIssuance, setIsIssuance] = useState<boolean>(false)

  const { onSetTransactionId, onSetTransactionStatus } = useTransactionWatcher()

  const {
    ethBalance,
    dpiBalance,
    cgiBalance,
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
  if (!isUserIssuing && issuanceToken === 'dpi') {
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
    if (!ethereum || !account) return

    setIssuanceData({} as any)

    getIssuanceTradeData(
      ethereum,
      issuanceToken,
      isUserIssuing,
      decToBn(targetTradeQuantity),
      selectedCurrency?.address,
      activeField
    )
      .then(async (output_amount) => {
        let decimal = 18
        if (selectedCurrency?.id === 'usdc') decimal = 6
        console.log('estimate return', output_amount)
        setIsFetchingOrderData(false)
        const dec = bnToDec(new BigNumber(output_amount), decimal).toString()
        let issuanceData: any = {}
        if (activeField === 'currency') issuanceData.trade_type = 'exact_in'
        else issuanceData.trade_type = 'exact_out'
        issuanceData.amountIn = decToBn(targetTradeQuantity)
        issuanceData.amountOut = output_amount
        issuanceData.amountOutConverted = dec

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
          account as string
        )
        if (!issuanceCallData || !transactionOptions) return
        let estimate
        try {
          estimate = await getIssuanceTradeEstimation(
            ethereum,
            issuanceTradeType,
            issuanceCallData,
            transactionOptions
          )
        } catch (e) {
          setIssuanceData({} as any)
          console.log('here', e)
          return
        }
        const gasPrice = await getGasPrice(ethereum)
        issuanceData.gasCost = `${bnToDec(
          new BigNumber(estimate).multipliedBy(new BigNumber(gasPrice))
        )} ETH`

        setIssuanceData(issuanceData)

        // Populate the inactive field with API response
        if (isUserIssuing) {
          if (activeField === 'currency') {
            setTokenQuantity(dec)
          } else {
            setCurrencyQuantity(dec)
          }
        } else {
          setCurrencyQuantity(dec)
        }
      })
      .catch((e: any) => {
        setIsFetchingOrderData(false)
      })
  }, [
    isUserIssuing,
    selectedCurrency,
    activeField,
    targetTradeQuantity,
    issuanceToken,
    ethereum,
    account,
  ])

  const onExecuteIssuance = useCallback(async () => {
    if (!account || !issuanceData?.amountIn || !selectedCurrency) return

    let requiredBalance = new BigNumber(issuanceData?.amountIn).dividedBy(
      new BigNumber(10).pow(18)
    )

    if (selectedCurrency.id === 'usdc') {
      requiredBalance = new BigNumber(issuanceData?.amountIn || 0).dividedBy(
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

  const onSetIsIssuance = (isIssuance: boolean) => {
    setIsIssuance(isIssuance)
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
        isIssuance,
        onSetIssuanceToken: setIssuanceToken,
        onToggleIsUserIssuing,
        onSetActiveField,
        onSetSelectedCurrency,
        onSetCurrencyQuantity,
        onSetTokenQuantity,
        onExecuteIssuance,
        onSetIsIssuance,
      }}
    >
      {children}
    </ExchangeIssuanceContext.Provider>
  )
}

export default ExchangeIssuanceProvider

import React, { useState, useEffect, useCallback } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'utils/bignumber'
import BuySellContext from './BuySellContext'
import { fetchTokenBuySellData } from 'utils/tokensetsApi'
import useWallet from 'hooks/useWallet'
import useBalances from 'hooks/useBalances'
import useTransactionWatcher from 'hooks/useTransactionWatcher'
import { useDebounce } from 'hooks/useDebounce'
import { getUniswapTradeTransaction } from 'uniswap-sdk/uniswap'
import {
  getUniswapTradeType,
  getUniswapCallData,
  getUniswapTransactionOptions,
} from './utils'
import { waitTransaction } from 'utils/index'
import { TransactionStatusType } from 'contexts/TransactionWatcher'
import { currencyTokens } from 'constants/currencyTokens'
import { UniswapPriceData } from './types'

const BuySellProvider: React.FC = ({ children }) => {
  const [isFetchingOrderData, setIsFetchingOrderData] = useState<boolean>(false)
  const [isUserBuying, setIsUserBuying] = useState<boolean>(true)
  const [activeField, setActiveField] = useState<'currency' | 'set'>('currency')
  const [selectedCurrency, setSelectedCurrency] = useState<any>()
  const [currencyQuantity, setCurrencyQuantity] = useState<string>()
  const [tokenQuantity, setTokenQuantity] = useState<string>()
  const [currencyOptions, setCurrencyOptions] = useState<any[]>([])
  const [uniswapData, setUniswapData] = useState<UniswapPriceData>(
    {} as UniswapPriceData
  )

  const { onSetTransactionId, onSetTransactionStatus } = useTransactionWatcher()

  const { ethBalance, dpiBalance, daiBalance, usdcBalance } = useBalances()

  const {
    account,
    ethereum,
  }: { account: string | null | undefined; ethereum: provider } = useWallet()

  useEffect(() => {
    setCurrencyOptions(currencyTokens)
    setSelectedCurrency(currencyTokens[0])
  }, [])

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
      'dpi',
      isUserBuying,
      targetTradeQuantity,
      selectedCurrency?.id,
      activeField
    ).then((uniswapData: UniswapPriceData) => {
      setIsFetchingOrderData(false)

      if (!uniswapData) return setUniswapData({} as any)

      setUniswapData(uniswapData)

      // Populate the inactive field with API response
      if (isUserBuying) {
        if (activeField === 'currency') {
          setTokenQuantity(uniswapData.display?.to_quantity)
        } else {
          setCurrencyQuantity(uniswapData.display?.from_quantity)
        }
      } else {
        if (activeField === 'currency') {
          setTokenQuantity(uniswapData.display?.from_quantity)
        } else {
          setCurrencyQuantity(uniswapData.display?.to_quantity)
        }
      }
    })
  }, [isUserBuying, selectedCurrency, activeField, targetTradeQuantity])

  const onExecuteBuySell = useCallback(async () => {
    if (!account || !selectedCurrency) return

    const requiredBalance = new BigNumber(uniswapData.amount_in).dividedBy(
      new BigNumber(10).pow(18)
    )

    let userBalance = new BigNumber(0)
    if (!isUserBuying) {
      userBalance = dpiBalance || new BigNumber(0)
    } else if (selectedCurrency.id === 'wrapped_eth') {
      userBalance = ethBalance || new BigNumber(0)
    } else if (selectedCurrency.id === 'mcd') {
      userBalance = daiBalance || new BigNumber(0)
    } else if (selectedCurrency.id === 'usdc') {
      userBalance = usdcBalance || new BigNumber(0)
    }

    if (userBalance?.isLessThanOrEqualTo(requiredBalance)) return

    const uniswapTradeType = getUniswapTradeType(
      isUserBuying,
      selectedCurrency.value,
      uniswapData
    )
    const uniswapCallData = getUniswapCallData(
      uniswapTradeType,
      uniswapData,
      account
    )
    const transactionOptions = getUniswapTransactionOptions(
      uniswapTradeType,
      uniswapData,
      account
    )

    if (!uniswapCallData || !transactionOptions) return

    const uniswapTradeTransaction = getUniswapTradeTransaction(
      ethereum,
      uniswapTradeType,
      uniswapCallData,
      transactionOptions
    )

    try {
      onSetTransactionStatus(TransactionStatusType.IS_APPROVING)
      const transactionId = await uniswapTradeTransaction()
      onSetTransactionId(transactionId)
      onSetTransactionStatus(TransactionStatusType.IS_PENDING)
      await waitTransaction(ethereum, transactionId)
      onSetTransactionStatus(TransactionStatusType.IS_COMPLETED)
    } catch (e) {
      onSetTransactionStatus(TransactionStatusType.IS_FAILED)
    }
  }, [
    account,
    isUserBuying,
    uniswapData,
    selectedCurrency,
    ethBalance,
    dpiBalance,
    daiBalance,
    usdcBalance,
  ])

  const onToggleIsUserBuying = () => setIsUserBuying(!isUserBuying)
  const onSetActiveField = (field: 'currency' | 'set') => setActiveField(field)
  const onSetCurrencyQuantity = (currencyQuantity: string) => {
    setIsFetchingOrderData(true)
    setCurrencyQuantity(currencyQuantity)
  }
  const onSetTokenQuantity = (tokenQuantity: string) => {
    setIsFetchingOrderData(true)
    setTokenQuantity(tokenQuantity)
  }
  const onSetSelectedCurrency = (currency: any) => {
    setSelectedCurrency(currency)
  }

  return (
    <BuySellContext.Provider
      value={{
        isFetchingOrderData,
        isUserBuying,
        activeField,
        selectedCurrency,
        currencyQuantity,
        tokenQuantity,
        currencyOptions,
        uniswapData,
        onToggleIsUserBuying,
        onSetActiveField,
        onSetSelectedCurrency,
        onSetCurrencyQuantity,
        onSetTokenQuantity,
        onExecuteBuySell,
      }}
    >
      {children}
    </BuySellContext.Provider>
  )
}

export default BuySellProvider

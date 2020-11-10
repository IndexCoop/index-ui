import React, { useState, useEffect, useCallback } from 'react'
import { provider } from 'web3-core'

import BuySellContext from './BuySellContext'
import { fetchTokenBuySellData } from 'utils/tokensetsApi'
import { useDebounce } from 'hooks/useDebounce'
import useWallet from 'hooks/useWallet'
import { UniswapPriceData } from './types'
import { getUniswapTradeTransaction } from 'uniswap-sdk/uniswap'
import {
  getUniswapTradeType,
  getUniswapCallData,
  getUniswapTransactionOptions,
} from './utils'
import useTransactionWatcher from 'hooks/useTransactionWatcher'
import { currencyTokens } from 'constants/tokenAddresses'

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

  const {
    transactionId,
    transactionStatus,
    onSetTransactionId,
    onSetTransactionStatus,
  } = useTransactionWatcher()

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
    if (!account) return

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
      const transactionId = await uniswapTradeTransaction()
      console.log(transactionId)
    } catch (e) {
      console.log('error is', e)
    }
  }, [account, isUserBuying, uniswapData, selectedCurrency])

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

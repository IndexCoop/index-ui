import React, { useState, useEffect } from 'react'
import { provider } from 'web3-core'

import BuySellContext from './BuySellContext'
import { fetchTokenBuySellData } from 'utils/tokensetsApi'
import { useDebounce } from 'hooks/useDebounce'
import useWallet from 'hooks/useWallet'
import { UniswapPriceData } from './types'
import {
  getUniswapTradeTransaction,
  UniswapTradeType,
} from '../../uniswap-sdk/uniswap'
import {
  getUniswapTradeType,
  getUniswapCallData,
  getUniswapTransactionOptions,
} from './utils'
import { useCallback } from 'react'

const BuySellProvider: React.FC = ({ children }) => {
  const [isViewingOrderSummary, setIsViewingOrderSummary] = useState<boolean>(
    false
  )
  const [isFetchingOrderData, setIsFetchingOrderData] = useState<boolean>(false)
  const [isUserBuying, setIsUserBuying] = useState<boolean>(true)
  const [activeField, setActiveField] = useState<'currency' | 'set'>('currency')
  const [selectedCurrency, setSelectedCurrency] = useState<any>()
  const [currencyQuantity, setCurrencyQuantity] = useState<number>(0)
  const [tokenQuantity, setTokenQuantity] = useState<number>(0)
  const [currencyOptions, setCurrencyOptions] = useState<any[]>([])
  const [uniswapData, setUniswapData] = useState<UniswapPriceData>(
    {} as UniswapPriceData
  )

  const {
    account,
    ethereum,
  }: { account: string | null | undefined; ethereum: provider } = useWallet()

  useEffect(() => {
    const options = [
      {
        value: 'wrapped_eth',
        label: 'ETH',
      },
      {
        value: 'dai',
        label: 'DAI',
      },
      {
        value: 'usdc',
        label: 'USDC',
      },
    ]
    setCurrencyOptions(options)
    setSelectedCurrency(options[0])
  }, [])

  const debouncedCurrencyQuantity = useDebounce(currencyQuantity)
  const debouncedTokenQuantity = useDebounce(tokenQuantity)
  const targetTradeQuantity =
    activeField === 'currency'
      ? debouncedCurrencyQuantity
      : debouncedTokenQuantity

  useEffect(() => {
    if (!targetTradeQuantity) return

    fetchTokenBuySellData(
      'dpi',
      isUserBuying,
      targetTradeQuantity,
      selectedCurrency?.value,
      activeField
    ).then((uniswapData: any) => {
      setIsFetchingOrderData(false)

      if (!uniswapData) return setUniswapData({} as any)

      setUniswapData(uniswapData)

      if (activeField === 'currency') {
        setTokenQuantity(uniswapData.display?.to_quantity)
      } else {
        setCurrencyQuantity(uniswapData.display?.from_quantity)
      }
    })
  }, [isUserBuying, selectedCurrency, activeField, targetTradeQuantity])

  const onExecuteBuySell = useCallback(() => {
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
  }, [account, isUserBuying, uniswapData, selectedCurrency])

  const onToggleIsViewingOrderSummary = () =>
    setIsViewingOrderSummary(!isViewingOrderSummary)
  const onToggleIsUserBuying = () => setIsUserBuying(!isUserBuying)
  const onSetActiveField = (field: 'currency' | 'set') => setActiveField(field)
  const onSetCurrencyQuantity = (e: any) => {
    setIsFetchingOrderData(true)
    setCurrencyQuantity(e.target.value)
  }
  const onSetTokenQuantity = (e: any) => {
    setIsFetchingOrderData(true)
    setTokenQuantity(e.target.value)
  }
  const onSetSelectedCurrency = (currency: any) => {
    setSelectedCurrency(currency)
  }

  return (
    <BuySellContext.Provider
      value={{
        isViewingOrderSummary,
        isFetchingOrderData,
        isUserBuying,
        activeField,
        selectedCurrency,
        currencyQuantity,
        tokenQuantity,
        currencyOptions,
        uniswapData,
        onToggleIsViewingOrderSummary,
        onToggleIsUserBuying,
        onSetActiveField,
        onSetSelectedCurrency,
        onSetCurrencyQuantity: onSetCurrencyQuantity,
        onSetTokenQuantity: onSetTokenQuantity,
        onExecuteBuySell: () => {},
      }}
    >
      {children}
    </BuySellContext.Provider>
  )
}

export default BuySellProvider

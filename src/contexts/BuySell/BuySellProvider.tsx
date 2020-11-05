import React, { useState, useEffect } from 'react'

import BuySellContext from './BuySellContext'
import { fetchTokenBuySellData } from 'utils/tokensetsApi'
import { useDebounce } from '../../hooks/useDebounce'

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
  const [uniswapData, setUniswapData] = useState<any>({})

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
      if (!uniswapData) return setUniswapData({})

      setUniswapData(uniswapData)

      if (activeField === 'currency') {
        setTokenQuantity(uniswapData.display?.to_quantity)
      } else {
        setCurrencyQuantity(uniswapData.display?.from_quantity)
      }
    })
  }, [isUserBuying, selectedCurrency, activeField, targetTradeQuantity])

  const onToggleIsViewingOrderSummary = () =>
    setIsViewingOrderSummary(!isViewingOrderSummary)
  const onToggleIsUserBuying = () => setIsUserBuying(!isUserBuying)
  const onSetActiveField = (field: 'currency' | 'set') => setActiveField(field)
  const onSetCurrencyQuantity = (e: any) => setCurrencyQuantity(e.target.value)
  const onSetTokenQuantity = (e: any) => setTokenQuantity(e.target.value)
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

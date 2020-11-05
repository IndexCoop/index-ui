import React, { useState, useEffect } from 'react'

import BuySellContext from './BuySellContext'

const BuySellProvider: React.FC = ({ children }) => {
  const [isViewingOrderSummary, setIsViewingOrderSummary] = useState<boolean>(
    false
  )
  const [isFetchingOrderData, setIsFetchingOrderData] = useState<boolean>(false)
  const [isUserBuying, setIsUserBuying] = useState<boolean>(true)
  const [activeField, setActiveField] = useState<'currency' | 'token'>(
    'currency'
  )
  const [selectedCurrency, setSelectedCurrency] = useState<any>()
  const [currencyQuantity, setCurrencyQuantity] = useState<number>(0)
  const [tokenQuantity, setTokenQuantity] = useState<number>(0)
  const [currencyOptions, setCurrencyOptions] = useState<any[]>([])
  const [uniswapData, setUniswapData] = useState<any>({})

  const onToggleIsViewingOrderSummary = () =>
    setIsViewingOrderSummary(!isViewingOrderSummary)
  const onToggleIsUserBuying = () => setIsUserBuying(!isUserBuying)
  const onSetActiveField = (field: 'currency' | 'token') =>
    setActiveField(field)

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
        onSetSelectedCurrency: () => {},
        onSetCurrencyQuantity: () => {},
        onSetTokenQuantity: () => {},
        onExecuteBuySell: () => {},
      }}
    >
      {children}
    </BuySellContext.Provider>
  )
}

export default BuySellProvider

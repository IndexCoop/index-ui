import React, { useState, useEffect } from 'react'

import BuySellContext from './BuySellContext'

const BuySellProvider: React.FC = ({ children }) => {
  const [isViewingOrderSummary] = useState<boolean>(false)
  const [isFetchingOrderData] = useState<boolean>(false)
  const [activeField] = useState<'currency' | 'token'>('currency')
  const [selectedCurrency] = useState<any>()
  const [currencyQuantity] = useState<number>(0)
  const [tokenQuantity] = useState<number>(0)
  const [currencyOptions] = useState<any[]>([])
  const [uniswapData] = useState<any>({})

  return (
    <BuySellContext.Provider
      value={{
        isViewingOrderSummary,
        isFetchingOrderData,
        activeField,
        selectedCurrency,
        currencyQuantity,
        tokenQuantity,
        currencyOptions,
        uniswapData,
        onExecuteBuySell: () => {},
      }}
    >
      {children}
    </BuySellContext.Provider>
  )
}

export default BuySellProvider

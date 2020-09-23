import React, { useCallback, useEffect, useState } from 'react'

import useYam from 'hooks/useYam'
import { bnToDec } from 'utils'
import { getCurrentPrice } from 'yam-sdk/utils'

import PricesContext from './PricesContext'

const PricesProvider: React.FC = ({ children }) => {
  const [yamTwap, setYamTwap] = useState<number>()
  const yam = useYam()

  const fetchCurrentPrice = useCallback(async () => {
    if (!yam) return
    const price = await getCurrentPrice(yam)
    setYamTwap(bnToDec(price))
  }, [setYamTwap, yam])

  useEffect(() => {
    fetchCurrentPrice()
    let refreshInterval = setInterval(fetchCurrentPrice, 10000)
    return () => clearInterval(refreshInterval)
  }, [fetchCurrentPrice])
  
  return (
    <PricesContext.Provider value={{
      yamTwap,
    }}>
      {children}
    </PricesContext.Provider>
  )
}

export default PricesProvider
import React, { useEffect, useState } from 'react'

import { GmiIndex } from 'constants/productTokens'
import { fetchHistoricalTokenMarketData } from 'utils/coingeckoApi'

import MarketDataContext from './GmiTokenMarketDataContext'

const GmiMarketDataProvider: React.FC = ({ children }) => {
  const [gmiMarketData, setGmiMarketData] = useState<any>({})

  useEffect(() => {
    fetchHistoricalTokenMarketData(GmiIndex.coingeckoId)
      .then((response: any) => {
        setGmiMarketData(response)
      })
      .catch((error: any) => console.log(error))
  }, [])

  const selectLatestMarketData = (marketData?: number[][]) =>
    marketData?.[marketData.length - 1]?.[1] || 0

  return (
    <MarketDataContext.Provider
      value={{
        ...gmiMarketData,
        latestMarketCap: selectLatestMarketData(gmiMarketData?.marketcaps),
        latestPrice: selectLatestMarketData(gmiMarketData?.hourlyPrices),
        latestVolume: selectLatestMarketData(gmiMarketData?.volumes),
      }}
    >
      {children}
    </MarketDataContext.Provider>
  )
}

export default GmiMarketDataProvider

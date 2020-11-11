import React, { useState, useEffect } from 'react'
import MarketDataContext from './DpiTokenMarketDataContext'
import { coingeckoDpiId } from 'constants/coingeckoIds'
import { fetchHistoricalTokenMarketData } from 'utils/coingeckoApi'

const DpiMarketDataProvider: React.FC = ({ children }) => {
  const [dpiMarketData, setDpiMarketData] = useState<any>({})

  useEffect(() => {
    const endTime = Date.now() / 1000
    const startTime = endTime - 86400 * 30 // 30 days

    fetchHistoricalTokenMarketData(coingeckoDpiId, startTime, endTime)
      .then((response: any) => {
        setDpiMarketData(response)
      })
      .catch((error: any) => console.log(error))
  }, [])

  const selectLatestMarketData = (marketData?: number[][]) =>
    marketData?.[marketData.length - 1]?.[1] || 0

  return (
    <MarketDataContext.Provider
      value={{
        ...dpiMarketData,
        latestMarketCap: selectLatestMarketData(dpiMarketData?.marketcaps),
        latestPrice: selectLatestMarketData(dpiMarketData?.prices),
        latestVolume: selectLatestMarketData(dpiMarketData?.volumes),
      }}
    >
      {children}
    </MarketDataContext.Provider>
  )
}

export default DpiMarketDataProvider

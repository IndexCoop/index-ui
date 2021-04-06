import React, { useState, useEffect } from 'react'
import MarketDataContext from './MviTokenMarketDataContext'
import { coingeckoCgiId } from 'constants/coingeckoIds'
import { fetchHistoricalTokenMarketData } from 'utils/coingeckoApi'

const MviMarketDataProvider: React.FC = ({ children }) => {
  const [cgiMarketData, setMviMarketData] = useState<any>({})

  useEffect(() => {
    const endTime = Date.now() / 1000
    const startTime = endTime - 86400 * 30 // 30 days

    fetchHistoricalTokenMarketData(coingeckoMviId, startTime, endTime)
      .then((response: any) => {
        setMviMarketData(response)
      })
      .catch((error: any) => console.log(error))
  }, [])

  const selectLatestMarketData = (marketData?: number[][]) =>
    marketData?.[marketData.length - 1]?.[1] || 0

  return (
    <MarketDataContext.Provider
      value={{
        ...cgiMarketData,
        latestMarketCap: selectLatestMarketData(cgiMarketData?.marketcaps),
        latestPrice: selectLatestMarketData(cgiMarketData?.prices),
        latestVolume: selectLatestMarketData(cgiMarketData?.volumes),
      }}
    >
      {children}
    </MarketDataContext.Provider>
  )
}

export default MviMarketDataProvider

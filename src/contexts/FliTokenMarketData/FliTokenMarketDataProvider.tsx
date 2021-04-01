import React, { useState, useEffect } from 'react'
import MarketDataContext from './FliTokenMarketDataContext'
import { coingeckoFliId } from 'constants/coingeckoIds'
import { fetchHistoricalTokenMarketData } from 'utils/coingeckoApi'

const FliMarketDataProvider: React.FC = ({ children }) => {
  const [fliMarketData, setFliMarketData] = useState<any>({})

  useEffect(() => {
    const endTime = Date.now() / 1000
    const startTime = endTime - 86400 * 30 // 30 days

    fetchHistoricalTokenMarketData(coingeckoFliId, startTime, endTime)
      .then((response: any) => {
        setFliMarketData(response)
      })
      .catch((error: any) => console.log(error))
  }, [])

  const selectLatestMarketData = (marketData?: number[][]) =>
    marketData?.[marketData.length - 1]?.[1] || 0

  return (
    <MarketDataContext.Provider
      value={{
        ...fliMarketData,
        latestMarketCap: selectLatestMarketData(fliMarketData?.marketcaps),
        latestPrice: selectLatestMarketData(fliMarketData?.prices),
        latestVolume: selectLatestMarketData(fliMarketData?.volumes),
      }}
    >
      {children}
    </MarketDataContext.Provider>
  )
}

export default FliMarketDataProvider

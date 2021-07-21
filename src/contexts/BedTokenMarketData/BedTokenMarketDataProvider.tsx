import React, { useState, useEffect } from 'react'
import MarketDataContext from './BedTokenMarketDataContext'
import { BedIndex } from 'constants/productTokens'
import { fetchHistoricalTokenMarketData } from 'utils/coingeckoApi'

const BedMarketDataProvider: React.FC = ({ children }) => {
  const [bedMarketData, setBedMarketData] = useState<any>({})

  useEffect(() => {
    fetchHistoricalTokenMarketData(BedIndex.coingeckoId)
      .then((response: any) => {
        setBedMarketData(response)
      })
      .catch((error: any) => console.log(error))
  }, [])

  const selectLatestMarketData = (marketData?: number[][]) =>
    marketData?.[marketData.length - 1]?.[1] || 0

  return (
    <MarketDataContext.Provider
      value={{
        ...bedMarketData,
        latestMarketCap: selectLatestMarketData(bedMarketData?.marketcaps),
        latestPrice: selectLatestMarketData(bedMarketData?.hourlyPrices),
        latestVolume: selectLatestMarketData(bedMarketData?.volumes),
      }}
    >
      {children}
    </MarketDataContext.Provider>
  )
}

export default BedMarketDataProvider

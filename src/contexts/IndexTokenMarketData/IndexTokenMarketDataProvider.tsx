import React, { useState, useEffect } from 'react'
import MarketDataContext from './IndexTokenMarketDataContext'
import { IndexToken } from 'constants/productTokens'
import { fetchHistoricalTokenMarketData } from 'utils/coingeckoApi'

const IndexMarketDataProvider: React.FC = ({ children }) => {
  const [indexMarketData, setIndexMarketData] = useState<any>({})

  useEffect(() => {
    fetchHistoricalTokenMarketData(IndexToken.coingeckoId)
      .then((response: any) => {
        setIndexMarketData(response)
      })
      .catch((error: any) => console.log(error))
  }, [])

  const selectLatestMarketData = (marketData?: number[][]) =>
    marketData?.[marketData.length - 1]?.[1] || 0

  return (
    <MarketDataContext.Provider
      value={{
        ...indexMarketData,
        latestMarketCap: selectLatestMarketData(indexMarketData?.marketcaps),
        latestPrice: selectLatestMarketData(indexMarketData.hourlyPrices),
        latestVolume: selectLatestMarketData(indexMarketData.volumes),
      }}
    >
      {children}
    </MarketDataContext.Provider>
  )
}

export default IndexMarketDataProvider

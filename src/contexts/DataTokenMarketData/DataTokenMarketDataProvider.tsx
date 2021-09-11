import React, { useState, useEffect } from 'react'
import MarketDataContext from './DataTokenMarketDataContext'
import { MetaverseIndex } from 'constants/productTokens'
import { fetchHistoricalTokenMarketData } from 'utils/coingeckoApi'

const DataMarketDataProvider: React.FC = ({ children }) => {
  const [dataMarketData, setDataMarketData] = useState<any>({})

  useEffect(() => {
    fetchHistoricalTokenMarketData(MetaverseIndex.coingeckoId)
      .then((response: any) => {
        setDataMarketData(response)
      })
      .catch((error: any) => console.log(error))
  }, [])

  const selectLatestMarketData = (marketData?: number[][]) =>
    marketData?.[marketData.length - 1]?.[1] || 0

  return (
    <MarketDataContext.Provider
      value={{
        ...dataMarketData,
        latestPrice: selectLatestMarketData(dataMarketData?.hourlyPrices),
        latestMarketCap: selectLatestMarketData(dataMarketData?.marketcaps),
        latestVolume: selectLatestMarketData(dataMarketData?.volumes),
      }}
    >
      {children}
    </MarketDataContext.Provider>
  )
}

export default DataMarketDataProvider

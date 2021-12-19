import React, { useEffect,useState } from 'react'

import { DataIndex } from 'constants/productTokens'
import { fetchHistoricalTokenMarketData } from 'utils/coingeckoApi'

import MarketDataContext from './DataTokenMarketDataContext'

const DataMarketDataProvider: React.FC = ({ children }) => {
  const [dataMarketData, setDataMarketData] = useState<any>({})

  useEffect(() => {
    fetchHistoricalTokenMarketData(DataIndex.coingeckoId)
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

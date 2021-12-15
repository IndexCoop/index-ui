import React, { useEffect,useState } from 'react'

import { DefiPulseIndex } from 'constants/productTokens'
import { fetchHistoricalTokenMarketData } from 'utils/coingeckoApi'

import MarketDataContext from './DpiTokenMarketDataContext'

const DpiMarketDataProvider: React.FC = ({ children }) => {
  const [dpiMarketData, setDpiMarketData] = useState<any>({})

  useEffect(() => {
    fetchHistoricalTokenMarketData(DefiPulseIndex.coingeckoId)
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
        latestPrice: selectLatestMarketData(dpiMarketData?.hourlyPrices),
        latestVolume: selectLatestMarketData(dpiMarketData?.volumes),
      }}
    >
      {children}
    </MarketDataContext.Provider>
  )
}

export default DpiMarketDataProvider

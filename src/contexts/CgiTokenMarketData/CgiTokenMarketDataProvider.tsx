import React, { useState, useEffect } from 'react'
import MarketDataContext from './CgiTokenMarketDataContext'
import { CoinGeckoIds } from 'constants/tokenIds'
import { fetchHistoricalTokenMarketData } from 'utils/coingeckoApi'

const CgiMarketDataProvider: React.FC = ({ children }) => {
  const [cgiMarketData, setCgiMarketData] = useState<any>({})

  useEffect(() => {
    fetchHistoricalTokenMarketData(CoinGeckoIds.CGI)
      .then((response: any) => {
        setCgiMarketData(response)
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

export default CgiMarketDataProvider

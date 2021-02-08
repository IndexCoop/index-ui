import React, { useState, useEffect } from 'react'
import MarketDataContext from './CgiTokenMarketDataContext'
import { coingeckoCgiId } from 'constants/coingeckoIds'
import { fetchHistoricalTokenMarketData } from 'utils/tokensetsApi'

const CgiMarketDataProvider: React.FC = ({ children }) => {
  const [cgiMarketData, setCgiMarketData] = useState<any>({})

  useEffect(() => {
    fetchHistoricalTokenMarketData(coingeckoCgiId)
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
        latestPrice: selectLatestMarketData(cgiMarketData?.prices),
      }}
    >
      {children}
    </MarketDataContext.Provider>
  )
}

export default CgiMarketDataProvider

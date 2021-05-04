import React, { useState, useEffect } from 'react'
import MarketDataContext from './MviTokenMarketDataContext'
import { MetaverseIndex } from 'constants/productTokens'
import { fetchHistoricalTokenMarketData } from 'utils/coingeckoApi'

const MviMarketDataProvider: React.FC = ({ children }) => {
  const [mviMarketData, setMviMarketData] = useState<any>({})

  useEffect(() => {
    fetchHistoricalTokenMarketData(MetaverseIndex.coingeckoId)
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
        ...mviMarketData,
        latestPrice: selectLatestMarketData(mviMarketData?.prices),
        latestMarketCap: selectLatestMarketData(mviMarketData?.marketcaps),
        latestVolume: selectLatestMarketData(mviMarketData?.volumes),
      }}
    >
      {children}
    </MarketDataContext.Provider>
  )
}

export default MviMarketDataProvider

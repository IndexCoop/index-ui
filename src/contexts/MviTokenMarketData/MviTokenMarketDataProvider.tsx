import React, { useState, useEffect } from 'react'
import MarketDataContext from './MviTokenMarketDataContext'
import { tokensetsMviId } from 'constants/tokensetsIds'
import { fetchHistoricalTokenMarketData } from 'utils/tokensetsApi'

const MviMarketDataProvider: React.FC = ({ children }) => {
  const [mviMarketData, setMviMarketData] = useState<any>({})

  useEffect(() => {
    fetchHistoricalTokenMarketData(tokensetsMviId)
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
      }}
    >
      {children}
    </MarketDataContext.Provider>
  )
}

export default MviMarketDataProvider

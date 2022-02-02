import React, { useEffect, useState } from 'react'

import { Matic2xFLIP } from 'constants/productTokens'
import { fetchHistoricalTokenMarketDataOnPolygon } from 'utils/coingeckoApi'
import { fetchSetComponentsBeta } from 'utils/tokensetsApi'

import MarketDataContext from './Matic2xFLITokenMarketDataContext'

const Matic2xFLIMarketDataProvider: React.FC = ({ children }) => {
  const [fliMarketData, setFliMarketData] = useState<any>([[]])
  const [fliMarketCap, setFliMarketCap] = useState<any>(0)

  useEffect(() => {
    fetchHistoricalTokenMarketDataOnPolygon(Matic2xFLIP.polygonAddress)
      .then((response: any) => {
        setFliMarketData(response)
      })
      .catch((error: any) => console.log(error))
  }, [])

  // TODO: Replace this with coingecko data once available.
  useEffect(() => {
    fetchSetComponentsBeta(Matic2xFLIP.tokensetsId)
      .then((response: any) => {
        setFliMarketCap(response?.marketCap)
      })
      .catch((error: any) => console.log(error))
  }, [])

  const selectLatestMarketData = (marketData?: number[][]) =>
    marketData?.[marketData.length - 1]?.[1] || 0

  return (
    <MarketDataContext.Provider
      value={{
        ...fliMarketData,
        latestMarketCap: fliMarketCap,
        latestPrice: selectLatestMarketData(fliMarketData?.hourlyPrices),
        latestVolume: selectLatestMarketData(fliMarketData?.volumes),
      }}
    >
      {children}
    </MarketDataContext.Provider>
  )
}

export default Matic2xFLIMarketDataProvider

import React, { useEffect,useState } from 'react'

import { Ethereum2xFLIP } from 'constants/productTokens'
import { fetchHistoricalTokenMarketDataOnPolygon } from 'utils/coingeckoApi'
import { fetchSetComponentsBeta } from 'utils/tokensetsApi'

import MarketDataContext from './Eth2xFLIPTokenMarketDataContext'

const Eth2xFLIPMarketDataProvider: React.FC = ({ children }) => {
  const [fliMarketData, setFliMarketData] = useState<any>([[]])
  const [fliMarketCap, setFliMarketCap] = useState<any>(0)

  useEffect(() => {
    fetchHistoricalTokenMarketDataOnPolygon(Ethereum2xFLIP.polygonAddress)
      .then((response: any) => {
        setFliMarketData(response)
      })
      .catch((error: any) => console.log(error))
  }, [])

  // TODO: Replace this with coingecko data once available.
  useEffect(() => {
    fetchSetComponentsBeta(Ethereum2xFLIP.tokensetsId)
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

export default Eth2xFLIPMarketDataProvider

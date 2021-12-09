import React, { useState, useEffect } from 'react'
import MarketDataContext from './Eth2xFLIPTokenMarketDataContext'
import { Ethereum2xFLIP } from 'constants/productTokens'
import {
  fetchHistoricalTokenMarketData,
  fetchSetComponentsBeta,
} from 'utils/tokensetsApi'

const Eth2xFLIPMarketDataProvider: React.FC = ({ children }) => {
  const [fliMarketData, setFliMarketData] = useState<any>([[]])
  const [fliMarketCapData, setFliMarketCapData] = useState<any>({})

  useEffect(() => {
    fetchHistoricalTokenMarketData(Ethereum2xFLIP.tokensetsId)
      .then((response: any) => {
        setFliMarketData(response?.prices)
      })
      .catch((error: any) => console.log(error))
  }, [])

  useEffect(() => {
    fetchSetComponentsBeta(Ethereum2xFLIP.tokensetsId)
      .then((response: any) => {
        setFliMarketCapData(response?.marketCap)
      })
      .catch((error: any) => console.log(error))
  }, [])

  const selectLatestMarketData = (marketData?: number[][]) =>
    marketData?.[marketData.length - 1]?.[1] || 0

  // TODO: Replace this data with Coingecko data once available
  // TOOD: correctly format prices and hourly prices via TokenSets API until Coingecko data is available
  return (
    <MarketDataContext.Provider
      value={{
        ...fliMarketData,
        prices: fliMarketData,
        hourlyPrices: fliMarketData,
        latestMarketCap: fliMarketCapData,
        latestPrice: selectLatestMarketData(fliMarketData),
        latestVolume: 0,
      }}
    >
      {children}
    </MarketDataContext.Provider>
  )
}

export default Eth2xFLIPMarketDataProvider

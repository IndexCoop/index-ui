import React, { useState, useEffect } from 'react'
import MarketDataContext from './Eth2xFLIPTokenMarketDataContext'
import { Ethereum2xFLIP } from 'constants/productTokens'
import { fetchHistoricalTokenMarketData } from 'utils/coingeckoApi'

const Eth2xFLIPMarketDataProvider: React.FC = ({ children }) => {
  const [fliMarketData, setFliMarketData] = useState<any>({})

  useEffect(() => {
    fetchHistoricalTokenMarketData(Ethereum2xFLIP.coingeckoId)
      .then((response: any) => {
        setFliMarketData(response)
      })
      .catch((error: any) => console.log(error))
  }, [])

  const selectLatestMarketData = (marketData?: number[][]) =>
    marketData?.[marketData.length - 1]?.[1] || 0

  return (
    <MarketDataContext.Provider
      value={{
        ...fliMarketData,
        latestMarketCap: selectLatestMarketData(fliMarketData?.marketcaps),
        latestPrice: selectLatestMarketData(fliMarketData?.hourlyPrices),
        latestVolume: selectLatestMarketData(fliMarketData?.volumes),
      }}
    >
      {children}
    </MarketDataContext.Provider>
  )
}

export default Eth2xFLIPMarketDataProvider

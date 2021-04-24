import React, { useState, useEffect } from 'react'
import MarketDataContext from './Btc2xFliTokenMarketDataContext'
import { CoinGeckoIds } from 'constants/tokenIds'
import { fetchHistoricalTokenMarketData } from 'utils/coingeckoApi'

const Btc2xFliTokenMarketDataProvider: React.FC = ({ children }) => {
  const [fliMarketData, setFliMarketData] = useState<any>({})

  useEffect(() => {
    fetchHistoricalTokenMarketData(CoinGeckoIds.BTC2XFLI)
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
        latestPrice: selectLatestMarketData(fliMarketData?.prices),
        latestVolume: selectLatestMarketData(fliMarketData?.volumes),
      }}
    >
      {children}
    </MarketDataContext.Provider>
  )
}

export default Btc2xFliTokenMarketDataProvider

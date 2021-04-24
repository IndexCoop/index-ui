import React, { useState, useEffect } from 'react'
import MarketDataContext from './Eth2xFliTokenMarketDataContext'
import { CoinGeckoIds } from 'constants/tokenIds'
import { fetchHistoricalTokenMarketData } from 'utils/coingeckoApi'

const Eth2xFliMarketDataProvider: React.FC = ({ children }) => {
  const [fliMarketData, setFliMarketData] = useState<any>({})

  useEffect(() => {
    fetchHistoricalTokenMarketData(CoinGeckoIds.ETH2XFLI)
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

export default Eth2xFliMarketDataProvider

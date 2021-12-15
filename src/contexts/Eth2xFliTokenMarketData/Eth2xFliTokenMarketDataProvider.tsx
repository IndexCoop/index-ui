import React, { useEffect,useState } from 'react'

import { Ethereum2xFlexibleLeverageIndex } from 'constants/productTokens'
import { fetchHistoricalTokenMarketData } from 'utils/coingeckoApi'

import MarketDataContext from './Eth2xFliTokenMarketDataContext'

const Eth2xFliMarketDataProvider: React.FC = ({ children }) => {
  const [fliMarketData, setFliMarketData] = useState<any>({})

  useEffect(() => {
    fetchHistoricalTokenMarketData(Ethereum2xFlexibleLeverageIndex.coingeckoId)
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

export default Eth2xFliMarketDataProvider

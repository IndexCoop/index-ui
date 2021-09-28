import React, { useState, useEffect } from 'react'
import TokenDataContext from './TokenDataContext'
import { DataIndex } from 'constants/productTokens'
import { fetchHistoricalTokenMarketData } from 'utils/coingeckoApi'
import { fetchSetComponents } from 'utils/tokensetsApi'

const DataMarketDataProvider: React.FC = ({ children }) => {
  const [dataMarketData, setDataMarketData] = useState<any>({})

  useEffect(() => {
    fetchHistoricalTokenMarketData(DataIndex.coingeckoId)
      .then((response: any) => {
        setDataMarketData(response)
      })
      .catch((error: any) => console.log(error))
  }, [])

  const selectLatestMarketData = (marketData?: number[][]) =>
    marketData?.[marketData.length - 1]?.[1] || 0

  return (
    <TokenDataContext.Provider
      value={{
        ...dataMarketData,
        latestPrice: selectLatestMarketData(dataMarketData?.hourlyPrices),
        latestMarketCap: selectLatestMarketData(dataMarketData?.marketcaps),
        latestVolume: selectLatestMarketData(dataMarketData?.volumes),
      }}
    >
      {children}
    </TokenDataContext.Provider>
  )
}

export default DataMarketDataProvider

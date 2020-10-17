import React, { useState, useEffect } from 'react'
import MarketDataContext from './DpiMarketDataContext'
import { coingeckoDpiId } from 'constants/coingeckoIds'
import { fetchHistoricalTokenMarketData } from 'utils/coingeckoApi'

interface HistoricalMarketDataProvider {
	// coingeckoId: string
	daysOfHistory: number
}

const DpiTokenPriceProvider: React.FC<HistoricalMarketDataProvider> = ({
	children,
	daysOfHistory
}) => {
	const [dpiMarketData, setDpiMarketData] = useState<any>({})
  useEffect(() => {
		const endTime = Date.now() / 1000;
		const startTime = endTime - (86400 * daysOfHistory);
		fetchHistoricalTokenMarketData(coingeckoDpiId, startTime, endTime)
			.then((response: any) => {
				setDpiMarketData(response)
			})
			.catch((error: any) => console.log(error));
  }, [])
	
	const getLatest = (arr?: number[][]) =>
		arr && arr.length ? arr[arr.length - 1][1] : 0
  return (
    <MarketDataContext.Provider value={{
      ...dpiMarketData,
			latestMarketCap: getLatest(dpiMarketData.marketcaps),
			latestPrice:  getLatest(dpiMarketData.prices),
			latestVolume: getLatest(dpiMarketData.volumes),
    }}>
      {children}
    </MarketDataContext.Provider>
  )
}

export default DpiTokenPriceProvider
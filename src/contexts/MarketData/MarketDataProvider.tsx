
import React, { useState, useEffect } from 'react'
import MarketDataContext from './MarketDataContext'
import { coingeckoDpiId } from 'constants/coingeckoIds'

const MarketDataProvider: React.FC = ({ children }) => {
	const [prices, setDpiPrices] = useState<number[][]>()
	const [marketcaps, setDpiMcaps] = useState<number[][]>()
	const [volumes, setDpiVolumes] = useState<number[][]>()

  useEffect(() => {
		const endTime = Date.now() / 1000;
		const startTime = endTime - (86400 * 30); // 30 days
		const baseCurrency = 'usd';
    const coingeckoDpiDataUrl =
			`https://api.coingecko.com/api/v3/coins/${coingeckoDpiId}`+
				`/market_chart/range/?vs_currency=${baseCurrency}&from=${startTime}&to=${endTime}`;

		console.log('fetching market data', coingeckoDpiDataUrl);
    fetch(coingeckoDpiDataUrl)
      .then(response => response.json())
      .then(response => {
				/** @notes from API docs
				 * Minutely data will be used for duration within 1 day
				 * Hourly data will be used for duration between 1 day and 90 days
				 * Daily data will be used for duration above 90 days.
				*/
				const {
					prices,
					market_caps: mcaps,
					total_volumes: volumes,
				} = response
				setDpiPrices(prices)
				setDpiVolumes(volumes)
				setDpiMcaps(mcaps)
      })
      .catch(error => console.log(error));
  }, [])
	
	const getLatest = (arr?: number[][]) =>
		arr && arr.length ? arr[arr.length - 1][1] : 0
  return (
    <MarketDataContext.Provider value={{
      prices,
			marketcaps,
			volumes,
			latestMarketCap: getLatest(marketcaps),
			latestPrice:  getLatest(prices),
			latestVolume: getLatest(volumes),
    }}>
      {children}
    </MarketDataContext.Provider>
  )
}

export default MarketDataProvider
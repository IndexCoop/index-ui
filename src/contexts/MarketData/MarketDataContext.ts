import { createContext } from 'react'

interface MarketContextValues {
	prices?: number[][]
	marketcaps?: number[][]
	volumes?: number[][]
	latestPrice?: number
	latestMarketCap?: number
	latestVolume?: number
}

const MarketContext = createContext<MarketContextValues>({})

export default MarketContext
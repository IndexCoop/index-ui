import { createContext } from 'react'

interface DpiMarketDataValues {
	prices?: number[][]
	marketcaps?: number[][]
	volumes?: number[][]
	latestPrice?: number
	latestMarketCap?: number
	latestVolume?: number
}

const DpiMarketData = createContext<DpiMarketDataValues>({})

export default DpiMarketData
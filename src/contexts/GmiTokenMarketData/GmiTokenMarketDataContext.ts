import { createContext } from 'react'

interface GmiTokenMarketDataValues {
  prices?: number[][]
  hourlyPrices?: number[][]
  marketcaps?: number[][]
  volumes?: number[][]
  latestPrice?: number
  latestMarketCap?: number
  latestVolume?: number
}

const GmiMarketData = createContext<GmiTokenMarketDataValues>({})

export default GmiMarketData

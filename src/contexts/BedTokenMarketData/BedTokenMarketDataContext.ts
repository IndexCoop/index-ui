import { createContext } from 'react'

interface BedTokenMarketDataValues {
  prices?: number[][]
  hourlyPrices?: number[][]
  marketcaps?: number[][]
  volumes?: number[][]
  latestPrice?: number
  latestMarketCap?: number
  latestVolume?: number
}

const BedMarketData = createContext<BedTokenMarketDataValues>({})

export default BedMarketData

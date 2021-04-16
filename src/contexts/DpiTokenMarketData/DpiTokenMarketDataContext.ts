import { createContext } from 'react'

interface DpiTokenMarketDataValues {
  prices?: number[][]
  hourlyPrices?: number[][]
  marketcaps?: number[][]
  volumes?: number[][]
  latestPrice?: number
  latestMarketCap?: number
  latestVolume?: number
}

const DpiMarketData = createContext<DpiTokenMarketDataValues>({})

export default DpiMarketData

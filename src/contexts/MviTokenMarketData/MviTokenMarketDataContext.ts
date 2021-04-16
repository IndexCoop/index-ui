import { createContext } from 'react'

interface MviTokenMarketDataValues {
  prices?: number[][]
  hourlyPrices?: number[][]
  marketcaps?: number[][]
  volumes?: number[][]
  latestPrice?: number
  latestMarketCap?: number
  latestVolume?: number
}

const MviMarketData = createContext<MviTokenMarketDataValues>({})

export default MviMarketData

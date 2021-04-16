import { createContext } from 'react'

interface IndexTokenMarketDataValues {
  prices?: number[][]
  hourlyPrices?: number[][]
  marketcaps?: number[][]
  volumes?: number[][]
  latestPrice?: number
  latestMarketCap?: number
  latestVolume?: number
}

const IndexMarketData = createContext<IndexTokenMarketDataValues>({})

export default IndexMarketData

import { createContext } from 'react'

interface FliTokenMarketDataValues {
  prices?: number[][]
  dayPrices?: number[][]
  marketcaps?: number[][]
  volumes?: number[][]
  latestPrice?: number
  latestMarketCap?: number
  latestVolume?: number
}

const FliMarketData = createContext<FliTokenMarketDataValues>({})

export default FliMarketData

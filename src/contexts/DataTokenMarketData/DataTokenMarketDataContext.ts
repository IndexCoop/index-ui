import { createContext } from 'react'

interface DataTokenMarketDataValues {
  prices?: number[][]
  hourlyPrices?: number[][]
  marketcaps?: number[][]
  volumes?: number[][]
  latestPrice?: number
  latestMarketCap?: number
  latestVolume?: number
}

const DataMarketData = createContext<DataTokenMarketDataValues>({})

export default DataMarketData

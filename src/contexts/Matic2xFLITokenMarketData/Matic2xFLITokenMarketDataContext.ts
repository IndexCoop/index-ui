import { createContext } from 'react'

interface Matic2xFLITokenMarketDataValues {
  prices?: number[][]
  hourlyPrices?: number[][]
  marketcaps?: number[][]
  volumes?: number[][]
  latestPrice?: number
  latestMarketCap?: number
  latestVolume?: number
}

const Matic2xFLITokenMarketData =
  createContext<Matic2xFLITokenMarketDataValues>({})

export default Matic2xFLITokenMarketData

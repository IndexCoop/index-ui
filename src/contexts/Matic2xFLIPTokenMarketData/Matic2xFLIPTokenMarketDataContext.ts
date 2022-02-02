import { createContext } from 'react'

interface Matic2xFLIPTokenMarketDataValues {
  prices?: number[][]
  hourlyPrices?: number[][]
  marketcaps?: number[][]
  volumes?: number[][]
  latestPrice?: number
  latestMarketCap?: number
  latestVolume?: number
}

const Matic2xFLIPTokenMarketData =
  createContext<Matic2xFLIPTokenMarketDataValues>({})

export default Matic2xFLIPTokenMarketData

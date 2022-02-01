import { createContext } from 'react'

interface IMatic2xFLITokenMarketDataValues {
  prices?: number[][]
  hourlyPrices?: number[][]
  marketcaps?: number[][]
  volumes?: number[][]
  latestPrice?: number
  latestMarketCap?: number
  latestVolume?: number
}

const IMatic2xFLITokenMarketData =
  createContext<IMatic2xFLITokenMarketDataValues>({})

export default IMatic2xFLITokenMarketData

import { createContext } from 'react'

interface IMaticFLIPTokenMarketDataValues {
  prices?: number[][]
  hourlyPrices?: number[][]
  marketcaps?: number[][]
  volumes?: number[][]
  latestPrice?: number
  latestMarketCap?: number
  latestVolume?: number
}

const IMaticFLIPTokenMarketData =
  createContext<IMaticFLIPTokenMarketDataValues>({})

export default IMaticFLIPTokenMarketData

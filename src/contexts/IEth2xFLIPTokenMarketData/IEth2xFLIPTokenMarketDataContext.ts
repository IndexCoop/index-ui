import { createContext } from 'react'

interface IEth2xFLIPTokenMarketDataValues {
  prices?: number[][]
  hourlyPrices?: number[][]
  marketcaps?: number[][]
  volumes?: number[][]
  latestPrice?: number
  latestMarketCap?: number
  latestVolume?: number
}

const IEth2xFLIPMarketData = createContext<IEth2xFLIPTokenMarketDataValues>({})

export default IEth2xFLIPMarketData

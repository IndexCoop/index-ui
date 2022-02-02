import { createContext } from 'react'

interface IEthFLIPTokenMarketDataValues {
  prices?: number[][]
  hourlyPrices?: number[][]
  marketcaps?: number[][]
  volumes?: number[][]
  latestPrice?: number
  latestMarketCap?: number
  latestVolume?: number
}

const IEthFLIPMarketData = createContext<IEthFLIPTokenMarketDataValues>({})

export default IEthFLIPMarketData

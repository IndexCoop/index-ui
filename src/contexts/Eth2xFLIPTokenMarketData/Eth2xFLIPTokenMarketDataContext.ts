import { createContext } from 'react'

interface Eth2xFLIPTokenMarketDataValues {
  prices?: number[][]
  hourlyPrices?: number[][]
  marketcaps?: number[][]
  volumes?: number[][]
  latestPrice?: number
  latestMarketCap?: number
  latestVolume?: number
}

const Eth2xFLIPMarketData = createContext<Eth2xFLIPTokenMarketDataValues>({})

export default Eth2xFLIPMarketData

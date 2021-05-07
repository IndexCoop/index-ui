import { createContext } from 'react'

interface Eth2xFliTokenMarketDataValues {
  prices?: number[][]
  hourlyPrices?: number[][]
  marketcaps?: number[][]
  volumes?: number[][]
  latestPrice?: number
  latestMarketCap?: number
  latestVolume?: number
}

const Eth2xFliMarketData = createContext<Eth2xFliTokenMarketDataValues>({})

export default Eth2xFliMarketData

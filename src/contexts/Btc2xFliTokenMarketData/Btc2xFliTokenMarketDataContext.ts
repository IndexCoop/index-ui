import { createContext } from 'react'

interface Btc2xFliTokenMarketDataValues {
  prices?: number[][]
  hourlyPrices?: number[][]
  marketcaps?: number[][]
  volumes?: number[][]
  latestPrice?: number
  latestMarketCap?: number
  latestVolume?: number
}

const Btc2xFliMarketData = createContext<Btc2xFliTokenMarketDataValues>({})

export default Btc2xFliMarketData

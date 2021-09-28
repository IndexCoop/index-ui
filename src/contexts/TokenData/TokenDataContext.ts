import IndexComponent from 'components/IndexComponent'
import { createContext } from 'react'

interface TokenDataValues {
  prices?: number[][]
  hourlyPrices?: number[][]
  marketcaps?: number[][]
  volumes?: number[][]
  latestPrice?: number
  latestMarketCap?: number
  latestVolume?: number
  components?: IndexComponent[]
  marketCap?: number
}

const TokenData = createContext<TokenDataValues>({})

export default TokenData

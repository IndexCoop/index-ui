import { createContext } from 'react'

interface PricesContextValues {
  dpiPrice: number
  indexPrice?: string
  ethereumPrice?: string
  totalUSDInFarms?: number
  apy?: string
  farmTwoApy?: string
  mviRewardsApy?: string
}

const PricesContext = createContext<PricesContextValues>({dpiPrice: 0})

export default PricesContext

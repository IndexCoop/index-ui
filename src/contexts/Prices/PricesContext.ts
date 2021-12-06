import { createContext } from 'react'

interface PricesContextValues {
  indexPrice?: string
  ethereumPrice?: string
  dpiPrice: number
  mviPrice: number
  bedPrice: number
  eth2xfliPrice: number
  eth2xflipPrice: number
  btc2xfliPrice: number
  dataPrice: number
  totalUSDInFarms?: number
  apy?: string
  farmTwoApy?: string
  mviRewardsApy?: string
}

const PricesContext = createContext<PricesContextValues>({
  dpiPrice: 0,
  mviPrice: 0,
  bedPrice: 0,
  eth2xfliPrice: 0,
  eth2xflipPrice: 0,
  btc2xfliPrice: 0,
  dataPrice: 0,
})

export default PricesContext

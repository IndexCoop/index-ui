import { createContext } from 'react'

interface PricesContextValues {
  indexPrice?: string
  ethereumPrice?: string
  dpiPrice: number
  mviPrice: number
  bedPrice: number
  gmiPrice: number
  eth2xfliPrice: number
  eth2xflipPrice: number
  iethflipPrice: number
  matic2xflipPrice: number
  imaticflipPrice: number
  btc2xfliPrice: number
  dataPrice: number
  totalUSDInFarms?: number
  apy?: string
  farmTwoApy?: string
  mviRewardsApy?: string
  gmiRewardsApy?: string
}

const PricesContext = createContext<PricesContextValues>({
  dpiPrice: 0,
  mviPrice: 0,
  bedPrice: 0,
  gmiPrice: 0,
  eth2xfliPrice: 0,
  eth2xflipPrice: 0,
  btc2xfliPrice: 0,
  dataPrice: 0,
  iethflipPrice: 0,
  matic2xflipPrice: 0,
  imaticflipPrice: 0,
})

export default PricesContext

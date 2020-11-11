import { createContext } from 'react'

interface PricesContextValues {
  indexPrice?: string
  ethereumPrice?: string
  totalUSDInFarms?: number
  apy?: string
}

const PricesContext = createContext<PricesContextValues>({})

export default PricesContext

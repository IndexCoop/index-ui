import { createContext } from 'react'

interface PricesContextValues {
  indexPrice?: string
  totalUSDInFarms?: number
  apy?: string
}

const PricesContext = createContext<PricesContextValues>({})

export default PricesContext

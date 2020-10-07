import { createContext } from 'react'

interface PricesContextValues {
  dpiPrice?: string
  totalUSDInFarms?: number
  apy?: string
}

const PricesContext = createContext<PricesContextValues>({})

export default PricesContext
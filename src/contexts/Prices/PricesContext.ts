import { createContext } from 'react'

interface PricesContextValues {
  dpiPrice?: string
  totalUSDInFarms?: number
}

const PricesContext = createContext<PricesContextValues>({})

export default PricesContext
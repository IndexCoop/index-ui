import { createContext } from 'react'

interface PricesContextValues {
  yamTwap?: number
}

const PricesContext = createContext<PricesContextValues>({})

export default PricesContext
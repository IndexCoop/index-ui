import { createContext } from 'react'

interface Eth2xFliTokenSupplyCapValues {
  ethfliSupplyCap?: string
}

const Eth2xFliTokenSupplyCap = createContext<Eth2xFliTokenSupplyCapValues>({})

export default Eth2xFliTokenSupplyCap

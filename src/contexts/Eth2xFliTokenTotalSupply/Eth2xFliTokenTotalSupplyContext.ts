import { createContext } from 'react'

interface Eth2xFliTokenTotalSupply {
  ethfliSupplyCap?: string
}

const EthFliTokenTotalSupply = createContext<Eth2xFliTokenTotalSupply>({})

export default EthFliTokenTotalSupply

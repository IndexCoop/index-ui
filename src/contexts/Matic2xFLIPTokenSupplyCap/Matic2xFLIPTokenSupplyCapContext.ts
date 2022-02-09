import { createContext } from 'react'

import BigNumber from 'utils/bignumber'

interface Matic2xFLIPTokenSupplyCapValues {
  maticflipSupplyCap?: BigNumber
}

const Matic2xFLIPTokenSupplyCapCap =
  createContext<Matic2xFLIPTokenSupplyCapValues>({})

export default Matic2xFLIPTokenSupplyCapCap

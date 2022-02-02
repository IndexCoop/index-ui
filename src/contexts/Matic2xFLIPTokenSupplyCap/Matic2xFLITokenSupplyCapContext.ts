import { createContext } from 'react'

import BigNumber from 'utils/bignumber'

interface Matic2xFLITokenSupplyCapValues {
  maticfliSupplyCap?: BigNumber
}

const Matic2xFLITokenSupplyCapCap =
  createContext<Matic2xFLITokenSupplyCapValues>({})

export default Matic2xFLITokenSupplyCapCap

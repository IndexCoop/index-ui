import { createContext } from 'react'

import BigNumber from 'utils/bignumber'

interface Eth2xFliTokenSupplyCapValues {
  ethfliSupplyCap?: BigNumber
}

const Eth2xFliTokenSupplyCap = createContext<Eth2xFliTokenSupplyCapValues>({})

export default Eth2xFliTokenSupplyCap

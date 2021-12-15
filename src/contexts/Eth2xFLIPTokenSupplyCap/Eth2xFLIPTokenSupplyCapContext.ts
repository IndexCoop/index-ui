import { createContext } from 'react'

import BigNumber from 'utils/bignumber'

interface Eth2xFLIPTokenSupplyCapValues {
  ethflipSupplyCap?: BigNumber
}

const Eth2xFLIPTokenSupplyCap = createContext<Eth2xFLIPTokenSupplyCapValues>({})

export default Eth2xFLIPTokenSupplyCap

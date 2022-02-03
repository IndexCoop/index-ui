import { createContext } from 'react'

import BigNumber from 'utils/bignumber'

interface IEthFLIPTokenSupplyCapValues {
  iethflipSupplyCap?: BigNumber
}

const IEthFLIPTokenSupplyCap = createContext<IEthFLIPTokenSupplyCapValues>({})

export default IEthFLIPTokenSupplyCap

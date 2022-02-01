import { createContext } from 'react'

import BigNumber from 'utils/bignumber'

interface IEth2xFLIPTokenSupplyCapValues {
  iethflipSupplyCap?: BigNumber
}

const IEth2xFLIPTokenSupplyCap = createContext<IEth2xFLIPTokenSupplyCapValues>(
  {}
)

export default IEth2xFLIPTokenSupplyCap

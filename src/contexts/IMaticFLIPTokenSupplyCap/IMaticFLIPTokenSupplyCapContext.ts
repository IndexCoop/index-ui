import { createContext } from 'react'

import BigNumber from 'utils/bignumber'

interface IMaticFLIPTokenSupplyCapValues {
  imaticflipSupplyCap?: BigNumber
}

const IMaticFLIPTokenSupplyCap = createContext<IMaticFLIPTokenSupplyCapValues>(
  {}
)

export default IMaticFLIPTokenSupplyCap

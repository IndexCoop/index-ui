import { createContext } from 'react'

import BigNumber from 'utils/bignumber'

interface IMatic2xFLITokenSupplyCapValues {
  imaticfliSupplyCap?: BigNumber
}

const IMatic2xFLITokenSupplyCap =
  createContext<IMatic2xFLITokenSupplyCapValues>({})

export default IMatic2xFLITokenSupplyCap

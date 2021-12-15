import { createContext } from 'react'

import BigNumber from 'utils/bignumber'

interface Btc2xFliTokenSupplyCapValues {
  btcfliSupplyCap?: BigNumber
}

const Btc2xFliTokenSupplyCap = createContext<Btc2xFliTokenSupplyCapValues>({})

export default Btc2xFliTokenSupplyCap

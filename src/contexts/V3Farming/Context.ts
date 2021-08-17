import { createContext } from 'react'
import BigNumber from 'utils/bignumber'

import { ContextValues } from './types'

const Context = createContext<ContextValues>({
  onDeposit: () => {},
  onWithdraw: () => {},
  onClaimAccrued: () => {},
  getValidIds: async () => {
    return []
  },
  getAccruedRewardsAmount: async () => {
    return new BigNumber(0)
  },
  getAllDepositedTokens: async () => {
    return []
  },
  getPendingRewardsAmount: async () => {
    return new BigNumber(0)
  },
})

export default Context

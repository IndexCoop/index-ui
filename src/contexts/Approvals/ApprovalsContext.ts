import { createContext } from 'react'
import BigNumber from 'utils/bignumber'

export interface Approvals {
  [spenderAddress: string]: {
    [token: string]: BigNumber
  }
}

interface ApprovalsContext {
  approvals?: Approvals
  onSetApprovals: (
    spenderAddress: string,
    tokenId: string,
    quantity: BigNumber
  ) => any
}

export default createContext<ApprovalsContext>({
  approvals: {},
  onSetApprovals: () => {},
})

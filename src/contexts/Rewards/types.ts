import BigNumber from 'bignumber.js'
import { Dispatch, SetStateAction } from 'react'

export interface ContextValues {
  rewardsQuantity?: string
  rewardIndex?: number
  rewardProof?: string[]
  isClaimable?: boolean
  claimableQuantity?: BigNumber
  onClaimRewards: () => void
  setMonth: Dispatch<SetStateAction<string>>
}

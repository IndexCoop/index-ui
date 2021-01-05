import BigNumber from 'bignumber.js'
import { Dispatch, SetStateAction } from 'react'

export interface ContextValues {
  rewardsQuantity?: string
  rewardIndex?: number
  rewardProof?: string[]
  isClaimable?: boolean
  claimableQuantity?: BigNumber
  onClaimRewards: () => void
  month?: string
  setMonth: Dispatch<SetStateAction<string>>
}

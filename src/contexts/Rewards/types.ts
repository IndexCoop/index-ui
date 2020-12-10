import BigNumber from 'bignumber.js'

export interface ContextValues {
  rewardsQuantity?: string
  rewardIndex?: number
  rewardProof?: string[]
  isClaimable?: boolean
  claimableQuantity?: BigNumber
  onClaimRewards: () => void
}

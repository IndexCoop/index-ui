import BigNumber from 'utils/bignumber'

import { FarmName } from 'index-sdk/uniV3Farm'

export interface ContextValues {
  onDeposit: (id: number, farm: FarmName) => void
  onWithdraw: (id: number, farm: FarmName) => void
  onClaimAccrued: (rewardToken: string) => void
  getValidIds: (farm: FarmName) => Promise<number[] | undefined>
  getAccruedRewardsAmount: (
    rewardToken: string
  ) => Promise<BigNumber | undefined>
  getAllDepositedTokens: (farm: FarmName) => Promise<number[] | undefined>
  getAllPendingRewardsAmount: (farm: FarmName) => Promise<BigNumber | undefined>
  getIndividualPendingRewardsAmount: (
    farm: FarmName
  ) => Promise<BigNumber[] | undefined>
}

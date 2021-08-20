import { V3Farm } from 'constants/v3Farms'
import BigNumber from 'utils/bignumber'

export interface ContextValues {
  onDeposit: (id: number, farm: V3Farm) => void
  onWithdraw: (id: number, farm: V3Farm) => void
  onClaimAccrued: (rewardToken: string) => void
  getValidIds: (farm: V3Farm) => Promise<number[] | undefined>
  getAccruedRewardsAmount: (
    rewardToken: string
  ) => Promise<BigNumber | undefined>
  getAllDepositedTokens: (farm: V3Farm) => Promise<number[] | undefined>
  getAllPendingRewardsAmount: (farm: V3Farm) => Promise<BigNumber | undefined>
  getIndividualPendingRewardsAmount: (
    farm: V3Farm,
    nftId: number
  ) => Promise<BigNumber>
}

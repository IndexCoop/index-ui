import {
  getValidIds,
  depositAndStake,
  getAccruedRewardsAmount,
  getAllDepositedTokens,
  withdraw,
  claimAccruedRewards,
} from 'index-sdk/uniV3Farm'

export function useV3Farming() {
  return {
    getValidIds,
    depositAndStake,
    getAccruedRewardsAmount,
    getAllDepositedTokens,
    withdraw,
    claimAccruedRewards,
  }
}

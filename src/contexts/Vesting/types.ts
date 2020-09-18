import BigNumber from 'bignumber.js'

export interface ContextValues {
  isClaiming?: boolean,
  onClaim: () => void,
  vestedBalance?: BigNumber,
  vestedDelegatorRewardBalance?: BigNumber,
  vestedMigratedBalance?: BigNumber
}
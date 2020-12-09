import BigNumber from 'bignumber.js'

export interface ContextValues {
  onClaim: () => void
  amount?: BigNumber
}

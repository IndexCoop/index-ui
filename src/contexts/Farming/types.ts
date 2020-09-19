export interface ContextValues {
  isApproved?: boolean,
  isApproving?: boolean,
  isStaking?: boolean,
  isUnstaking?: boolean,
  onApprove: () => void,
  onStake: (amount: string) => void,
  onUnstake: (amount: string) => void
}
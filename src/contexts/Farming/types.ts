export interface ContextValues {
  isApproved?: boolean
  isApproving?: boolean
  isPoolActive?: boolean
  onApprove: () => void
  onStake: (amount: string) => void
  onUnstake: (amount: string) => void
  onHarvest: () => void
  onUnstakeAndHarvest: () => void
}

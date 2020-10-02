export interface ContextValues {
  countdown?: number,
  farmingStartTime: number,
  isApproved?: boolean,
  isApproving?: boolean,
  onApprove: () => void,
  onStake: (amount: string) => void,
  onUnstake: (amount: string) => void,
  onHarvest: () => void,
  onUnstakeAndHarvest: () => void,
}
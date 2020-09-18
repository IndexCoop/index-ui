export interface ContextValues {
  isApproved?: boolean,
  isApproving?: boolean,
  isMigrating?: boolean,
  onApprove: () => void,
  onMigrate: () => void,
}
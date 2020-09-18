import { useContext } from 'react'

import { MigrationContext } from 'contexts/Migration'

const useMigration = () => {
  const {
    isApproved,
    isApproving,
    onApprove
  } = useContext(MigrationContext)
  return {
    isApproved,
    isApproving,
    onApprove,
  }
}

export default useMigration
import { useContext } from 'react'

import { SnapshotProposalsContext } from 'contexts/SnapshotProposals'

const useSnapshotProposals = () => {
  return { ...useContext(SnapshotProposalsContext) }
}

export default useSnapshotProposals

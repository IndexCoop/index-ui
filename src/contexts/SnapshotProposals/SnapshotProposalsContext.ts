import { createContext } from 'react'
import { SnapshotProposalsContextValues } from './types'

const SnapshotProposalsContext = createContext<SnapshotProposalsContextValues>({
  indexProposals: {},
})

export default SnapshotProposalsContext

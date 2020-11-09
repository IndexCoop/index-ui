import React, { useState, useEffect } from 'react'
import SnapshotProposalsContext from './SnapshotProposalsContext'
import { fetchIndexProposals } from 'utils/snapshotApi'

const SnapshotProposalsProvider: React.FC = ({ children }) => {
  const [snapshotProposals, setSnapshotProposals] = useState<any>({})

  useEffect(() => {
    fetchIndexProposals()
      .then((response: any) => {
        setSnapshotProposals({ indexProposals: response.data })
      })
      .catch((error: any) => console.log(error))
  }, [])

  return (
    <SnapshotProposalsContext.Provider
      value={{
        ...snapshotProposals,
      }}
    >
      {children}
    </SnapshotProposalsContext.Provider>
  )
}

export default SnapshotProposalsProvider

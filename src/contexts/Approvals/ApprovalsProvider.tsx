import React, { useState, useEffect } from 'react'

import ApprovalsContext, { Approvals } from './ApprovalsContext'
import BigNumber from 'utils/bignumber'

const ApprovalsProvider: React.FC = ({ children }) => {
  const [approvals, setApprovals] = useState<Approvals>({})

  const onSetApprovals = (
    spenderAddress: string,
    tokenId: string,
    quantity: BigNumber
  ) => {
    if (!spenderAddress || !tokenId || !quantity) return

    const nextApprovals = Object.assign({}, approvals)
    nextApprovals[spenderAddress][tokenId] = quantity

    setApprovals(nextApprovals)
  }

  return (
    <ApprovalsContext.Provider
      value={{
        approvals,
        onSetApprovals,
      }}
    >
      {children}
    </ApprovalsContext.Provider>
  )
}

export default ApprovalsProvider

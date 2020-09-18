import React from 'react'

import { yamv2 as yamV2Address } from 'constants/tokenAddresses'
import useAllowance from 'hooks/useAllowance'
import useApproval from 'hooks/useApproval'

import Context from './Context'

const Provider: React.FC = ({ children }) => {
  const allowance = useAllowance(yamV2Address, yamV2Address)
  const { isApproved, isApproving, onApprove } = useApproval(yamV2Address, yamV2Address)

  return (
    <Context.Provider value={{
      isApproved: isApproved || allowance && !!allowance.toNumber(),
      isApproving,
      onApprove,
    }}>
      {children}
    </Context.Provider>
  )
}

export default Provider
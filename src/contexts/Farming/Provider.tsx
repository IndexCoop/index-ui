import React, { useCallback, useState } from 'react'

import useApproval from 'hooks/useApproval'

import Context from './Context'

const Provider: React.FC = ({ children }) => {
  const { isApproved, isApproving, onApprove } = useApproval('', '')
  
  const [isStaking, setIsStaking] = useState(false)
  const [isUnstaking, setIsUnstaking] = useState(false)

  const handleStake = useCallback(() => {

  }, [])

  const handleUnstake = useCallback(() => {

  }, [])

  return (
    <Context.Provider value={{
      isApproved,
      isApproving,
      onApprove,
    }}>
      {children}
    </Context.Provider>
  )
}

export default Provider
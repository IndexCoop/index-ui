import React from 'react'

import useApproval from 'hooks/useApproval'

import Context from './Context'

const Provider: React.FC = ({ children }) => {
  const { isApproved, isApproving, onApprove } = useApproval('', '')

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
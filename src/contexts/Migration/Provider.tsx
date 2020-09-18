import React, { useCallback, useEffect } from 'react'

import { yamv2 as yamV2Address } from 'constants/tokenAddresses'
import { migrator as migrator } from 'constants/tokenAddresses'

import useApproval from 'hooks/useApproval'
import useYam from 'hooks/useYam'
import { migrateV3 } from 'yam-sdk/utils'

import Context from './Context'

const Provider: React.FC = ({ children }) => {
  const yam = useYam()
  const { isApproved, isApproving, onApprove } = useApproval(yamV2Address, migrator)

  const handleMigrate = useCallback(() => {

  }, [])

  useEffect(() => {
    if (yam) {
    }
  }, [yam])

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

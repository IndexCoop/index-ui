import React, { useCallback, useState } from 'react'
import { useWallet } from 'use-wallet'

import { yamv2 as yamV2Address } from 'constants/tokenAddresses'
import useApproval from 'hooks/useApproval'
import useYam from 'hooks/useYam'
import { migrateV3 } from 'yam-sdk/utils'

import ConfirmTransactionModal from 'components/ConfirmTransactionModal'

import Context from './Context'

const Provider: React.FC = ({ children }) => {
  const { account } = useWallet()
  const yam = useYam()
  const { isApproved, isApproving, onApprove } = useApproval(
    yamV2Address,
    yam ? yam.contracts.migrator.options.address : undefined
  )
  const [isMigrating, setIsMigrating] = useState(false)
  const [confirmTxModalIsOpen, setConfirmtxModalIsOpen] = useState(false)

  const handleMigrationTxSent = useCallback(() => {
    setIsMigrating(true)
    setConfirmtxModalIsOpen(false)
  }, [
    setIsMigrating,
    setConfirmtxModalIsOpen
  ])

  const handleMigrate = useCallback(async () => {
    setConfirmtxModalIsOpen(true)
    await migrateV3(yam, account, handleMigrationTxSent)
    setIsMigrating(false)
  }, [
    account,
    handleMigrationTxSent,
    setConfirmtxModalIsOpen,
    setIsMigrating,
    yam
  ])

  return (
    <Context.Provider value={{
      isApproved,
      isApproving,
      onApprove,
      onMigrate: handleMigrate,
      isMigrating,
    }}>
      {children}
      <ConfirmTransactionModal isOpen={confirmTxModalIsOpen} />
    </Context.Provider>
  )
}

export default Provider

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
  const [isMigrating, setIsMigrating] = useState(false)
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false)

  const { isApproved, isApproving, onApprove } = useApproval(
    yamV2Address,
    yam ? yam.contracts.migrator.options.address : undefined,
    () => setConfirmTxModalIsOpen(false)
  )

  const handleApprove = useCallback(() => {
    setConfirmTxModalIsOpen(true)
    onApprove()
  }, [
    onApprove,
    setConfirmTxModalIsOpen,
  ])

  const handleMigrationTxSent = useCallback(() => {
    setIsMigrating(true)
    setConfirmTxModalIsOpen(false)
  }, [
    setIsMigrating,
    setConfirmTxModalIsOpen
  ])

  const handleMigrate = useCallback(async () => {
    setConfirmTxModalIsOpen(true)
    await migrateV3(yam, account, handleMigrationTxSent)
    setIsMigrating(false)
  }, [
    account,
    handleMigrationTxSent,
    setConfirmTxModalIsOpen,
    setIsMigrating,
    yam
  ])

  return (
    <Context.Provider value={{
      isApproved,
      isApproving,
      onApprove: handleApprove,
      onMigrate: handleMigrate,
      isMigrating,
    }}>
      {children}
      <ConfirmTransactionModal isOpen={confirmTxModalIsOpen} />
    </Context.Provider>
  )
}

export default Provider

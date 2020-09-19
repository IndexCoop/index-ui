import React, { useCallback, useState } from 'react'

import { useWallet } from 'use-wallet'

import ConfirmTransactionModal from 'components/ConfirmTransactionModal'

import useApproval from 'hooks/useApproval'
import useYam from 'hooks/useYam'

import { stake, unstake } from 'yam-sdk/utils'

import Context from './Context'

const Provider: React.FC = ({ children }) => {
  const { isApproved, isApproving, onApprove } = useApproval('', '')
  const yam = useYam()
  const { account } = useWallet()
  
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false)
  const [isStaking, setIsStaking] = useState(false)
  const [isUnstaking, setIsUnstaking] = useState(false)

  const handleStake = useCallback(async (amount: string) => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    await stake(yam, amount, account, () => {
      setConfirmTxModalIsOpen(false)
      setIsStaking(true)
    })
    setIsStaking(false)
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsStaking,
    yam
  ])

  const handleUnstake = useCallback(async (amount: string) => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    await unstake(yam, amount, account, () => {
      setConfirmTxModalIsOpen(false)
      setIsUnstaking(true)
    })
    setIsUnstaking(false)
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsUnstaking,
    yam
  ])

  return (
    <Context.Provider value={{
      isApproved,
      isApproving,
      isStaking,
      isUnstaking,
      onApprove,
      onStake: handleStake,
      onUnstake: handleUnstake,
    }}>
      {children}
      <ConfirmTransactionModal isOpen={confirmTxModalIsOpen} />
    </Context.Provider>
  )
}

export default Provider
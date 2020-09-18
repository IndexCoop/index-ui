import React, { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import useYam from 'hooks/useYam'
import { claimVested, currVested } from 'yam-sdk/utils'

import ConfirmTransactionModal from 'components/ConfirmTransactionModal'

import Context from './Context'

const Provider: React.FC = ({ children }) => {
  const { account } = useWallet()
  const yam = useYam()
  const [vestedBalance, setVestedBalance] = useState<BigNumber>()
  const [isClaiming, setIsClaiming] = useState(false)
  const [confirmTxModalIsOpen, setConfirmtxModalIsOpen] = useState(false)

  const fetchVestedBalance = useCallback(async () => {
    const vBal = await currVested(yam, account)
    setVestedBalance(vBal)
  }, [
    account,
    setVestedBalance,
    yam,
  ])

  const handleClaimTxSent = useCallback(() => {
    setIsClaiming(true)
    setConfirmtxModalIsOpen(false)
  }, [
    setIsClaiming,
    setConfirmtxModalIsOpen
  ])

  const handleClaim = useCallback(async () => {
    setConfirmtxModalIsOpen(true)
    await claimVested(yam, account, handleClaimTxSent)
    setIsClaiming(false)
  }, [
    account,
    handleClaimTxSent,
    setConfirmtxModalIsOpen,
    setIsClaiming,
    yam
  ])

  useEffect(() => {
    if (account && yam) {
      fetchVestedBalance()
    }
  }, [
    account,
    fetchVestedBalance,
    yam,
  ])

  return (
    <Context.Provider value={{
      onClaim: handleClaim,
      isClaiming,
      vestedBalance,
    }}>
      {children}
      <ConfirmTransactionModal isOpen={confirmTxModalIsOpen} />
    </Context.Provider>
  )
}

export default Provider

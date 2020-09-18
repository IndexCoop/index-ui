import React, { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import useYam from 'hooks/useYam'
import { 
  claimVested,
  currUnclaimedMigratorVesting,
  currUnclaimedDelegatorRewards,
  currVested,
} from 'yam-sdk/utils'

import ConfirmTransactionModal from 'components/ConfirmTransactionModal'

import Context from './Context'

const Provider: React.FC = ({ children }) => {
  const { account } = useWallet()
  const yam = useYam()

  const [vestedBalance, setVestedBalance] = useState<BigNumber>()
  const [vestedDelegatorRewardBalance, setVestedDelegatorRewardBalance] = useState<BigNumber>()
  const [vestedMigratedBalance, setVestedMigratedBalance] = useState<BigNumber>()

  const [isClaiming, setIsClaiming] = useState(false)
  const [confirmTxModalIsOpen, setConfirmtxModalIsOpen] = useState(false)

  const fetchVestedBalances = useCallback(async () => {
    const vBal = await currVested(yam, account)
    const dRVBal = await currUnclaimedDelegatorRewards(yam, account)
    const mVBal = await currUnclaimedMigratorVesting(yam, account)
    setVestedBalance(vBal)
    setVestedDelegatorRewardBalance(dRVBal)
    setVestedMigratedBalance(mVBal)
  }, [
    account,
    setVestedBalance,
    setVestedDelegatorRewardBalance,
    setVestedMigratedBalance,
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
      fetchVestedBalances()
    }
  }, [
    account,
    fetchVestedBalances,
    yam,
  ])

  useEffect(() => {
    if (account && yam) {
      fetchVestedBalances()
      let refreshInterval = setInterval(fetchVestedBalances, 10000)
      return () => clearInterval(refreshInterval)
    }
  }, [
    account,
    yam,
    fetchVestedBalances,
  ])

  return (
    <Context.Provider value={{
      onClaim: handleClaim,
      isClaiming,
      vestedBalance,
      vestedDelegatorRewardBalance,
      vestedMigratedBalance,
    }}>
      {children}
      <ConfirmTransactionModal isOpen={confirmTxModalIsOpen} />
    </Context.Provider>
  )
}

export default Provider

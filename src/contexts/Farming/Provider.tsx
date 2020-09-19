import React, { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import ConfirmTransactionModal from 'components/ConfirmTransactionModal'
import { yycrvUniLp as yycrvUniLpAddress } from 'constants/tokenAddresses'
import useApproval from 'hooks/useApproval'
import useYam from 'hooks/useYam'

import {
  getStaked,
  stake,
  unstake,
} from 'yam-sdk/utils'

import Context from './Context'

const Provider: React.FC = ({ children }) => {
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false)
  const [isStaking, setIsStaking] = useState(false)
  const [isUnstaking, setIsUnstaking] = useState(false)
  const [stakedBalance, setStakedBalance] = useState<BigNumber>()

  const yam = useYam()
  const { account } = useWallet()
  
  const yycrvPoolAddress = yam ? yam.contracts.yycrv_pool.options.address : ''
  const { isApproved, isApproving, onApprove } = useApproval(
    yycrvUniLpAddress,
    yycrvPoolAddress,
    () => setConfirmTxModalIsOpen(false)
  )

  const fetchStakedBalance = useCallback(async () => {
    if (!account || !yam) return
    const balance = await getStaked(yam, yam.contracts.yycrv_pool, account)
    setStakedBalance(balance)
  }, [
    account,
    setStakedBalance,
    yam
  ])

  const handleApprove = useCallback(() => {
    setConfirmTxModalIsOpen(true)
    onApprove()
  }, [
    onApprove,
    setConfirmTxModalIsOpen,
  ])

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

  useEffect(() => {
    fetchStakedBalance()
    let refreshInterval = setInterval(() => fetchStakedBalance(), 10000)
    return () => clearInterval(refreshInterval)
  }, [
    fetchStakedBalance,
  ])

  return (
    <Context.Provider value={{
      isApproved,
      isApproving,
      isStaking,
      isUnstaking,
      onApprove: handleApprove,
      onStake: handleStake,
      onUnstake: handleUnstake,
      stakedBalance,
    }}>
      {children}
      <ConfirmTransactionModal isOpen={confirmTxModalIsOpen} />
    </Context.Provider>
  )
}

export default Provider
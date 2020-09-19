import React, { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import ConfirmTransactionModal from 'components/ConfirmTransactionModal'
import { yycrvUniLp as yycrvUniLpAddress } from 'constants/tokenAddresses'
import useApproval from 'hooks/useApproval'
import useYam from 'hooks/useYam'

import {
  getEarned,
  getStaked,
  harvest,
  redeem,
  stake,
  unstake,
} from 'yam-sdk/utils'

import Context from './Context'

const farmingStartTime = 1600545500*1000

const Provider: React.FC = ({ children }) => {
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false)
  const [countdown, setCountdown] = useState<number>()
  const [isHarvesting, setIsHarvesting] = useState(false)
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [isStaking, setIsStaking] = useState(false)
  const [isUnstaking, setIsUnstaking] = useState(false)

  const [earnedBalance, setEarnedBalance] = useState<BigNumber>()
  const [stakedBalance, setStakedBalance] = useState<BigNumber>()

  const yam = useYam()
  const { account } = useWallet()
  
  const yycrvPoolAddress = yam ? yam.contracts.yycrv_pool.options.address : ''
  const { isApproved, isApproving, onApprove } = useApproval(
    yycrvUniLpAddress,
    yycrvPoolAddress,
    () => setConfirmTxModalIsOpen(false)
  )

  const fetchEarnedBalance = useCallback(async () => {
    if (!account || !yam) return
    const balance = await getEarned(yam, yam.contracts.yycrv_pool, account)
    setEarnedBalance(balance)
  }, [
    account,
    setEarnedBalance,
    yam
  ])

  const fetchStakedBalance = useCallback(async () => {
    if (!account || !yam) return
    const balance = await getStaked(yam, yam.contracts.yycrv_pool, account)
    setStakedBalance(balance)
  }, [
    account,
    setStakedBalance,
    yam
  ])

  const fetchBalances = useCallback(async () => {
    fetchEarnedBalance()
    fetchStakedBalance()
  }, [
    fetchEarnedBalance,
    fetchStakedBalance,
  ])

  const handleApprove = useCallback(() => {
    setConfirmTxModalIsOpen(true)
    onApprove()
  }, [
    onApprove,
    setConfirmTxModalIsOpen,
  ])

  const handleHarvest = useCallback(async () => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    await harvest(yam, account, () => {
      setConfirmTxModalIsOpen(false)
      setIsHarvesting(true)
    })
    setIsHarvesting(false)
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsHarvesting,
    yam
  ])

  const handleRedeem = useCallback(async () => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    await redeem(yam, account, () => {
      setConfirmTxModalIsOpen(false)
      setIsRedeeming(true)
    })
    setIsRedeeming(false)
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsRedeeming,
    yam
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
    fetchBalances()
    let refreshInterval = setInterval(() => fetchBalances(), 10000)
    return () => clearInterval(refreshInterval)
  }, [fetchBalances])

  useEffect(() => {
    let refreshInterval = setInterval(() => setCountdown(farmingStartTime - Date.now()), 1000)
    return () => clearInterval(refreshInterval)
  }, [setCountdown])

  return (
    <Context.Provider value={{
      farmingStartTime,
      countdown,
      earnedBalance,
      isApproved,
      isApproving,
      isHarvesting,
      isRedeeming,
      isStaking,
      isUnstaking,
      onApprove: handleApprove,
      onHarvest: handleHarvest,
      onRedeem: handleRedeem,
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
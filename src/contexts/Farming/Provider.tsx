import React, { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import ConfirmTransactionModal, {
  TransactionStatusType,
} from 'components/ConfirmTransactionModal'
import { stakingRewardsAddress, uniswapEthDpiLpTokenAddress } from 'constants/tokenAddresses'
import useApproval from 'hooks/useApproval'
import useYam from 'hooks/useYam'

import {
  getEarned,
  getStaked,
  harvest,
  redeem,
} from 'yam-sdk/utils'

import Context from './Context'
import { stakeUniswapEthDpiLpTokens, unstakeUniswapEthDpiLpTokens } from '../../index-sdk/stake';
import { provider } from 'web3-core';
import { waitTransaction } from '../../utils/index';

const farmingStartTime = 1600545500*1000

const Provider: React.FC = ({ children }) => {
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false)
  const [transactionStatusType, setTransactionStatusType] = useState<
    TransactionStatusType | undefined
  >()
  const [countdown, setCountdown] = useState<number>()
  const [isHarvesting, setIsHarvesting] = useState(false)
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [isStaking, setIsStaking] = useState(false)
  const [isUnstaking, setIsUnstaking] = useState(false)

  const [earnedBalance, setEarnedBalance] = useState<BigNumber>()
  const [stakedBalance, setStakedBalance] = useState<BigNumber>()

  const yam = useYam()
  const { account, ethereum } = useWallet()
  
  const { isApproved, isApproving, onApprove } = useApproval(
    uniswapEthDpiLpTokenAddress,
    stakingRewardsAddress,
    () => setConfirmTxModalIsOpen(false)
  )

  // TODO: fetch earned balance for harvesting
  const fetchEarnedBalance = useCallback(async () => {
    if (!account || !yam) return
    const balance = await getEarned(yam, yam.contracts.yycrv_pool, account)
    setEarnedBalance(balance)
  }, [
    account,
    setEarnedBalance,
    yam
  ])

  // TODO: fetch staked balance to display to user
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
    if (!ethereum || !account || !amount || new BigNumber(amount).lte(0)) return

    setConfirmTxModalIsOpen(true)
    setTransactionStatusType(TransactionStatusType.IS_APPROVING)

    const bigStakeQuantity = new BigNumber(amount).multipliedBy(new BigNumber(10).pow(18))
    const transactionId = await stakeUniswapEthDpiLpTokens(ethereum as provider, account, bigStakeQuantity)

    if (!transactionId) {
      setTransactionStatusType(TransactionStatusType.IS_FAILED)
      return;
    }

    setTransactionStatusType(TransactionStatusType.IS_PENDING)
    const success = await waitTransaction(ethereum as provider, transactionId)

    if (success) {
      setTransactionStatusType(TransactionStatusType.IS_COMPLETED)
    } else {
      setTransactionStatusType(TransactionStatusType.IS_FAILED)
    }
  }, [
    ethereum,
    account,
    setConfirmTxModalIsOpen,
  ])

  const handleUnstake = useCallback(async (amount: string) => {
    if (!ethereum || !account || !amount || new BigNumber(amount).lte(0)) return
    setConfirmTxModalIsOpen(true)
    const bigStakeQuantity = new BigNumber(amount).multipliedBy(new BigNumber(10).pow(18))
    await unstakeUniswapEthDpiLpTokens(ethereum as provider, account, bigStakeQuantity)
    // TODO: add isStakingTrue
    setConfirmTxModalIsOpen(false)
  }, [
    ethereum,
    account,
    setConfirmTxModalIsOpen,
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
      <ConfirmTransactionModal
        isOpen={confirmTxModalIsOpen}
        transactionMiningStatus={transactionStatusType}
        onDismiss={() => setConfirmTxModalIsOpen(false)}
      />
    </Context.Provider>
  )
}

export default Provider
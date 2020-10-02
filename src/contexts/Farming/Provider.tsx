import React, { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core';
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import ConfirmTransactionModal, {
  TransactionStatusType,
} from 'components/ConfirmTransactionModal'
import useApproval from 'hooks/useApproval'
import useYam from 'hooks/useYam'
import Context from './Context'
import { stakeUniswapEthDpiLpTokens, unstakeUniswapEthDpiLpTokens } from 'index-sdk/stake';
import {
  harvest,
  redeem,
} from 'yam-sdk/utils'
import { waitTransaction } from 'utils/index';
import { stakingRewardsAddress, uniswapEthDpiLpTokenAddress } from 'constants/tokenAddresses'

const farmingStartTime = 1600545500*1000

const Provider: React.FC = ({ children }) => {
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false)
  const [transactionStatusType, setTransactionStatusType] = useState<
    TransactionStatusType | undefined
  >()
  const [countdown, setCountdown] = useState<number>()
  const [isHarvesting, setIsHarvesting] = useState(false)
  const [isRedeeming, setIsRedeeming] = useState(false)

  const [earnedBalance] = useState<BigNumber>()

  const yam = useYam()
  const { account, ethereum } = useWallet()
  
  const { isApproved, isApproving, onApprove } = useApproval(
    uniswapEthDpiLpTokenAddress,
    stakingRewardsAddress,
    () => setConfirmTxModalIsOpen(false)
  )

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
    setTransactionStatusType(TransactionStatusType.IS_APPROVING)

    const bigStakeQuantity = new BigNumber(amount).multipliedBy(new BigNumber(10).pow(18))
    const transactionId = await unstakeUniswapEthDpiLpTokens(ethereum as provider, account, bigStakeQuantity)

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
      onApprove: handleApprove,
      onHarvest: handleHarvest,
      onRedeem: handleRedeem,
      onStake: handleStake,
      onUnstake: handleUnstake,
    }}>
      {children}
      <ConfirmTransactionModal
        isOpen={confirmTxModalIsOpen}
        transactionMiningStatus={transactionStatusType}
        onDismiss={() => {
          setConfirmTxModalIsOpen(false)
          setTransactionStatusType(undefined)
        }}
      />
    </Context.Provider>
  )
}

export default Provider
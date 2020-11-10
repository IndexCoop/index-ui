import React, { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'
import BigNumber from 'utils/bignumber'
import confetti from 'canvas-confetti'

import Context from './Context'
import ConfirmTransactionModal, {
  TransactionStatusType,
} from 'components/ConfirmTransactionModal'
import useApproval from 'hooks/useApproval'
import useLocalStorage from 'hooks/useLocalStorage'
import useWallet from 'hooks/useWallet'
import {
  stakeUniswapEthDpiLpTokens,
  unstakeUniswapEthDpiLpTokens,
  claimEarnedIndexLpReward,
  unstakeAndClaimEarnedIndexLpReward,
} from 'index-sdk/stake'
import { waitTransaction } from 'utils/index'
import {
  stakingRewardsAddress,
  uniswapEthDpiLpTokenAddress,
} from 'constants/ethContractAddresses'

// Oct 7th 2020, 12pm PDT
const farmingStartTime = 1602097200000
const fireConfetti = () => {
  confetti({
    particleCount: 100,
    startVelocity: 30,
    spread: 360,
    origin: {
      x: Math.random(),
      y: Math.random() - 0.2,
    },
  })
}

const launchFireworks = () => {
  fireConfetti()
  setTimeout(fireConfetti, 1000)
  setTimeout(fireConfetti, 2200)
  setTimeout(fireConfetti, 3000)
  setTimeout(fireConfetti, 4200)
  setTimeout(fireConfetti, 5000)
  setTimeout(fireConfetti, 6100)
  setTimeout(fireConfetti, 7300)
  setTimeout(fireConfetti, 7900)
  setTimeout(fireConfetti, 8800)
}

const Provider: React.FC = ({ children }) => {
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false)
  const [transactionStatusType, setTransactionStatusType] = useState<
    TransactionStatusType | undefined
  >()
  const [countdown, setCountdown] = useState<number>()
  const [hasHooted, hoot] = useLocalStorage('hasHooted', false)

  const { account, ethereum } = useWallet()

  const {
    isApproved,
    isApproving,
    onApprove,
  } = useApproval(uniswapEthDpiLpTokenAddress, stakingRewardsAddress, () =>
    setConfirmTxModalIsOpen(false)
  )

  const handleApprove = useCallback(() => {
    setConfirmTxModalIsOpen(true)
    onApprove()
  }, [onApprove, setConfirmTxModalIsOpen])

  const handleStake = useCallback(
    async (amount: string) => {
      if (!ethereum || !account || !amount || new BigNumber(amount).lte(0))
        return

      setConfirmTxModalIsOpen(true)
      setTransactionStatusType(TransactionStatusType.IS_APPROVING)

      const bigStakeQuantity = new BigNumber(amount).multipliedBy(
        new BigNumber(10).pow(18)
      )
      const transactionId = await stakeUniswapEthDpiLpTokens(
        ethereum as provider,
        account,
        bigStakeQuantity
      )

      if (!transactionId) {
        setTransactionStatusType(TransactionStatusType.IS_FAILED)
        return
      }

      setTransactionStatusType(TransactionStatusType.IS_PENDING)
      const success = await waitTransaction(ethereum as provider, transactionId)

      if (success) {
        setTransactionStatusType(TransactionStatusType.IS_COMPLETED)
      } else {
        setTransactionStatusType(TransactionStatusType.IS_FAILED)
      }
    },
    [ethereum, account, setConfirmTxModalIsOpen]
  )

  const handleUnstake = useCallback(
    async (amount: string) => {
      if (!ethereum || !account || !amount || new BigNumber(amount).lte(0))
        return

      setConfirmTxModalIsOpen(true)
      setTransactionStatusType(TransactionStatusType.IS_APPROVING)

      const bigStakeQuantity = new BigNumber(amount).multipliedBy(
        new BigNumber(10).pow(18)
      )
      const transactionId = await unstakeUniswapEthDpiLpTokens(
        ethereum as provider,
        account,
        bigStakeQuantity
      )

      if (!transactionId) {
        setTransactionStatusType(TransactionStatusType.IS_FAILED)
        return
      }

      setTransactionStatusType(TransactionStatusType.IS_PENDING)
      const success = await waitTransaction(ethereum as provider, transactionId)

      if (success) {
        setTransactionStatusType(TransactionStatusType.IS_COMPLETED)
      } else {
        setTransactionStatusType(TransactionStatusType.IS_FAILED)
      }
    },
    [ethereum, account, setConfirmTxModalIsOpen]
  )

  const handleHarvest = useCallback(async () => {
    if (!ethereum || !account) return

    setConfirmTxModalIsOpen(true)
    setTransactionStatusType(TransactionStatusType.IS_APPROVING)

    const transactionId = await claimEarnedIndexLpReward(
      ethereum as provider,
      account
    )

    if (!transactionId) {
      setTransactionStatusType(TransactionStatusType.IS_FAILED)
      return
    }

    setTransactionStatusType(TransactionStatusType.IS_PENDING)
    const success = await waitTransaction(ethereum as provider, transactionId)

    if (success) {
      setTransactionStatusType(TransactionStatusType.IS_COMPLETED)
    } else {
      setTransactionStatusType(TransactionStatusType.IS_FAILED)
    }
  }, [ethereum, account, setConfirmTxModalIsOpen])

  const handleUnstakeAndHarvest = useCallback(async () => {
    if (!ethereum || !account) return

    setConfirmTxModalIsOpen(true)
    setTransactionStatusType(TransactionStatusType.IS_APPROVING)

    const transactionId = await unstakeAndClaimEarnedIndexLpReward(
      ethereum as provider,
      account
    )

    if (!transactionId) {
      setTransactionStatusType(TransactionStatusType.IS_FAILED)
      return
    }

    setTransactionStatusType(TransactionStatusType.IS_PENDING)
    const success = await waitTransaction(ethereum as provider, transactionId)

    if (success) {
      setTransactionStatusType(TransactionStatusType.IS_COMPLETED)
    } else {
      setTransactionStatusType(TransactionStatusType.IS_FAILED)
    }
  }, [ethereum, account, setConfirmTxModalIsOpen])

  useEffect(() => {
    let refreshInterval = setInterval(
      () => setCountdown(farmingStartTime - Date.now()),
      1000
    )
    return () => clearInterval(refreshInterval)
  }, [setCountdown])

  useEffect(() => {
    if (
      countdown &&
      countdown < 0 && // If the countdown finishes
      countdown > -3600000 && // If 3600 seconds (1 hour) haven't passed
      !hasHooted
    ) {
      const audio = new Audio('https://index-dao.s3.amazonaws.com/hoot.mp3')
      audio.play()
      launchFireworks()
      hoot(true)
    }
  }, [hasHooted, countdown, hoot])

  return (
    <Context.Provider
      value={{
        farmingStartTime,
        countdown,
        isApproved,
        isApproving,
        onApprove: handleApprove,
        onHarvest: handleHarvest,
        onUnstakeAndHarvest: handleUnstakeAndHarvest,
        onStake: handleStake,
        onUnstake: handleUnstake,
      }}
    >
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

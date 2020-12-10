import React, { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'
import BigNumber from 'utils/bignumber'

import Context from './Context'
import ConfirmTransactionModal, {
  TransactionStatusType,
} from 'components/ConfirmTransactionModal'
import useWallet from 'hooks/useWallet'
import {
  checkIsRewardsClaimed,
  claimRewards,
  getRewardsDataForAddress,
} from 'index-sdk/rewards'
import { waitTransaction } from 'utils/index'

const Provider: React.FC = ({ children }) => {
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false)
  const [transactionStatusType, setTransactionStatusType] = useState<
    TransactionStatusType | undefined
  >()
  const [rewardsQuantity, setRewardsQuantity] = useState<string>()
  const [rewardIndex, setRewardIndex] = useState<number>()
  const [rewardProof, setRewardProof] = useState<string[]>()
  const [isClaimable, setIsClaimable] = useState<boolean>(false)
  const [claimableQuantity, setClaimableQuantity] = useState<BigNumber>()
  const {
    account,
    ethereum,
  }: { account: string | null | undefined; ethereum: provider } = useWallet()

  const checkRewardClaimStatus = useCallback(async () => {
    setRewardsQuantity(undefined)
    setRewardIndex(undefined)
    setRewardProof(undefined)
    setIsClaimable(false)
    setClaimableQuantity(new BigNumber(0))

    const initialReward = getRewardsDataForAddress(account || '')

    if (!initialReward) {
      return
    }

    const isAlreadyClaimed = await checkIsRewardsClaimed(
      ethereum,
      initialReward.index as number
    )

    if (isAlreadyClaimed) {
      return
    }

    const claimQuantity = new BigNumber(initialReward.amount || '0').dividedBy(
      new BigNumber(10).pow(18)
    )

    setRewardsQuantity(initialReward.amount)
    setRewardIndex(initialReward.index)
    setRewardProof(initialReward.proof)
    setIsClaimable(true)
    setClaimableQuantity(claimQuantity)
  }, [ethereum, account])

  useEffect(() => {
    if (!ethereum || !account) return

    checkRewardClaimStatus()
  }, [ethereum, account, checkRewardClaimStatus])

  const onClaimRewards = useCallback(async () => {
    if (!rewardIndex || !account || !rewardsQuantity || !rewardProof) return

    setConfirmTxModalIsOpen(true)
    setTransactionStatusType(TransactionStatusType.IS_APPROVING)
    const transactionId = await claimRewards(
      ethereum,
      account,
      rewardIndex,
      account,
      rewardsQuantity,
      rewardProof
    )

    if (!transactionId) {
      setTransactionStatusType(TransactionStatusType.IS_FAILED)
      return
    }

    setTransactionStatusType(TransactionStatusType.IS_PENDING)
    const success = await waitTransaction(ethereum, transactionId)

    if (success) {
      setTransactionStatusType(TransactionStatusType.IS_COMPLETED)
      setClaimableQuantity(new BigNumber(0))
    } else {
      setTransactionStatusType(TransactionStatusType.IS_FAILED)
    }
  }, [
    ethereum,
    account,
    rewardIndex,
    rewardsQuantity,
    rewardProof,
    setConfirmTxModalIsOpen,
  ])

  return (
    <Context.Provider
      value={{
        rewardsQuantity,
        claimableQuantity,
        rewardIndex,
        rewardProof,
        isClaimable,
        onClaimRewards,
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

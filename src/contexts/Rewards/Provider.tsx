import React, { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'
import BigNumber from 'utils/bignumber'

import Context from './Context'
import ConfirmTransactionModal, {
  TransactionStatusType,
} from 'components/ConfirmTransactionModal'
import useWallet from 'hooks/useWallet'
import useTransactionWatcher from 'hooks/useTransactionWatcher'
import {
  checkIsRewardsClaimed,
  claimRewards,
  getRewardsDataForAddress,
} from 'index-sdk/rewards'
import { waitTransaction } from 'utils/index'

import {
  november2020RewardsAddress,
  december2020RewardsAddress,
  january2021RewardsAddress,
} from 'constants/ethContractAddresses'
import november2020MerkleData from 'index-sdk/merkleData/november2020Rewards.json'
import december2020MerkleData from 'index-sdk/merkleData/december2020Rewards.json'
import january2021MerkleData from 'index-sdk/merkleData/january2021Rewards.json'

const Provider: React.FC = ({ children }) => {
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false)
  const [rewardsQuantity, setRewardsQuantity] = useState<string>()
  const [rewardIndex, setRewardIndex] = useState<number>()
  const [rewardProof, setRewardProof] = useState<string[]>()
  const [isClaimable, setIsClaimable] = useState<boolean>(false)
  const [claimableQuantity, setClaimableQuantity] = useState<BigNumber>()
  const [month, setMonth] = useState('Select a Reward Month')
  const [rewardsAddress, setRewardsAddress] = useState('')
  const [merkleData, setMerkleData] = useState({})

  const {
    transactionId,
    transactionStatus,
    onSetTransactionStatus,
    onSetTransactionId,
  } = useTransactionWatcher()
  const {
    account,
    ethereum,
  }: { account: string | null | undefined; ethereum: provider } = useWallet()

  //set proper contract address and merkle data depending on month
  useEffect(() => {
    switch (month) {
      case 'January 2021': {
        setRewardsAddress(january2021RewardsAddress!)
        setMerkleData(january2021MerkleData)
        break
      }
      case 'December 2020': {
        setRewardsAddress(december2020RewardsAddress!)
        setMerkleData(december2020MerkleData)
        break
      }
      case 'November 2020': {
        setRewardsAddress(november2020RewardsAddress!)
        setMerkleData(november2020MerkleData)
        break
      }
    }
  }, [month])

  const checkRewardClaimStatus = useCallback(async () => {
    setRewardsQuantity(undefined)
    setRewardIndex(undefined)
    setRewardProof(undefined)
    setIsClaimable(false)
    setClaimableQuantity(new BigNumber(0))

    const initialReward = getRewardsDataForAddress(account || '', merkleData)
    if (!initialReward) {
      return
    }

    const isAlreadyClaimed = await checkIsRewardsClaimed(
      ethereum,
      initialReward.index as number,
      rewardsAddress
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
  }, [ethereum, account, merkleData, rewardsAddress])

  useEffect(() => {
    if (!ethereum || !account) return

    checkRewardClaimStatus()
  }, [ethereum, account, checkRewardClaimStatus, merkleData, rewardsAddress])

  const onClaimRewards = useCallback(async () => {
    if (!rewardIndex || !account || !rewardsQuantity || !rewardProof) return

    setConfirmTxModalIsOpen(true)
    onSetTransactionStatus(TransactionStatusType.IS_APPROVING)
    const transactionId = await claimRewards(
      ethereum,
      account,
      rewardIndex,
      account,
      rewardsQuantity,
      rewardProof,
      rewardsAddress
    )

    if (!transactionId) {
      onSetTransactionStatus(TransactionStatusType.IS_FAILED)
      return
    }

    onSetTransactionId(transactionId)
    onSetTransactionStatus(TransactionStatusType.IS_PENDING)

    const success = await waitTransaction(ethereum, transactionId)

    if (success) {
      onSetTransactionStatus(TransactionStatusType.IS_COMPLETED)
      setClaimableQuantity(new BigNumber(0))
    } else {
      onSetTransactionStatus(TransactionStatusType.IS_FAILED)
    }
  }, [
    ethereum,
    account,
    rewardIndex,
    rewardsQuantity,
    rewardProof,
    setConfirmTxModalIsOpen,
    merkleData,
    rewardsAddress,
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
        month,
        setMonth,
      }}
    >
      {children}
      <ConfirmTransactionModal
        isOpen={confirmTxModalIsOpen}
        transactionId={transactionId}
        transactionMiningStatus={transactionStatus}
        onDismiss={() => {
          setConfirmTxModalIsOpen(false)
          onSetTransactionStatus(undefined)
        }}
      />
    </Context.Provider>
  )
}

export default Provider

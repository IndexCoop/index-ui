import React, { useState, useEffect } from 'react'
import { provider } from 'web3-core'
import { useCallback } from 'react'
import BigNumber from 'bignumber.js'

import AirdropContext from './AirdropContext'
import ConfirmTransactionModal, {
  TransactionStatusType,
} from 'components/ConfirmTransactionModal'

import {
  claimAirdrop,
  checkIsAirdropClaimed,
  getAirdropDataForAddress,
} from 'index-sdk/index'
import useWallet from 'hooks/useWallet'
import { waitTransaction } from 'utils/index'

const AirdropProvider: React.FC = ({ children }) => {
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false)
  const [transactionStatusType, setTransactionStatusType] = useState<
    TransactionStatusType | undefined
  >()
  const [airdropQuantity, setAirdropQuantity] = useState<string>()
  const [rewardIndex, setRewardIndex] = useState<number>()
  const [rewardProof, setRewardProof] = useState<string[]>()
  const [isClaimable, setIsClaimable] = useState<boolean>(false)
  const [claimableQuantity, setClaimableQuantity] = useState<BigNumber>()
  const {
    account,
    ethereum,
  }: { account: string | null | undefined; ethereum: provider } = useWallet()

  const checkAirdropClaimStatus = useCallback(async () => {
    setAirdropQuantity(undefined)
    setRewardIndex(undefined)
    setRewardProof(undefined)
    setIsClaimable(false)
    setClaimableQuantity(new BigNumber(0))

    const initialAirdropReward = getAirdropDataForAddress(account || '')

    if (!initialAirdropReward) {
      return
    }

    const isAlreadyClaimed = await checkIsAirdropClaimed(
      ethereum,
      initialAirdropReward.index as number
    )

    if (isAlreadyClaimed) {
      return
    }

    const claimQuantity = new BigNumber(
      initialAirdropReward.amount || '0'
    ).dividedBy(new BigNumber(10).pow(18))

    setAirdropQuantity(initialAirdropReward.amount)
    setRewardIndex(initialAirdropReward.index)
    setRewardProof(initialAirdropReward.proof)
    setIsClaimable(true)
    setClaimableQuantity(claimQuantity)
  }, [ethereum, account])

  useEffect(() => {
    if (!ethereum || !account) return

    checkAirdropClaimStatus()
  }, [ethereum, account, checkAirdropClaimStatus])

  const onClaimAirdrop = useCallback(async () => {
    if (!rewardIndex || !account || !airdropQuantity || !rewardProof) return

    setConfirmTxModalIsOpen(true)
    setTransactionStatusType(TransactionStatusType.IS_APPROVING)
    const transactionId = await claimAirdrop(
      ethereum,
      account,
      rewardIndex,
      account,
      airdropQuantity,
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
    airdropQuantity,
    rewardProof,
    setConfirmTxModalIsOpen,
  ])

  return (
    <AirdropContext.Provider
      value={{
        airdropQuantity,
        claimableQuantity,
        rewardIndex,
        rewardProof,
        isClaimable,
        onClaimAirdrop,
      }}
    >
      {children}
      <ConfirmTransactionModal
        isOpen={confirmTxModalIsOpen}
        transactionMiningStatus={transactionStatusType}
        onDismiss={() => setConfirmTxModalIsOpen(false)}
      />
    </AirdropContext.Provider>
  )
}

export default AirdropProvider

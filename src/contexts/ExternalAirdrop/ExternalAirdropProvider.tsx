import React, { useState } from 'react'
import { provider } from 'web3-core'
import { useCallback } from 'react'
import BigNumber from 'utils/bignumber'

import AirdropContext from './ExternalAirdropContext'
import ConfirmTransactionModal, {
  TransactionStatusType,
} from 'components/ConfirmTransactionModal'

import {
  claimAirdrop,
  checkIsAirdropClaimed,
  getAirdropDataForAddress,
} from 'index-sdk/index'
import useWallet from 'hooks/useWallet'
import useTransactionWatcher from 'hooks/useTransactionWatcher'
import { waitTransaction } from 'utils/index'

const AirdropProvider: React.FC = ({ children }) => {
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false)
  const [externalAddress, setExternalAddress] = useState<string>()
  const [airdropQuantity, setAirdropQuantity] = useState<string>()
  const [rewardIndex, setRewardIndex] = useState<number>()
  const [rewardProof, setRewardProof] = useState<string[]>()
  const [isClaimable, setIsClaimable] = useState<boolean>(false)
  const [claimErrorMessage, setClaimErrorMessage] = useState<string>()
  const [claimableQuantity, setClaimableQuantity] = useState<BigNumber>()

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

  const onCheckAirdropClaim = useCallback(async () => {
    setAirdropQuantity(undefined)
    setRewardIndex(undefined)
    setRewardProof(undefined)
    setIsClaimable(false)
    setClaimErrorMessage('')
    setClaimableQuantity(undefined)

    if (!ethereum || !externalAddress) return

    const initialAirdropReward = getAirdropDataForAddress(externalAddress || '')

    if (!initialAirdropReward) {
      setClaimErrorMessage(
        'This address has not been allocated any airdrop rewards.'
      )
      return
    }

    const isAlreadyClaimed = await checkIsAirdropClaimed(
      ethereum,
      initialAirdropReward.index as number
    )

    if (isAlreadyClaimed) {
      setClaimErrorMessage(
        'This address has already claimed its airdrop reward.'
      )
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
  }, [ethereum, externalAddress])

  const onClaimAirdrop = useCallback(async () => {
    if (
      !account ||
      !externalAddress ||
      !airdropQuantity ||
      typeof rewardIndex !== 'number' ||
      !rewardProof
    )
      return

    setConfirmTxModalIsOpen(true)
    onSetTransactionStatus(TransactionStatusType.IS_APPROVING)

    const transactionId = await claimAirdrop(
      ethereum,
      account,
      rewardIndex,
      externalAddress,
      airdropQuantity,
      rewardProof
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
    } else {
      onSetTransactionStatus(TransactionStatusType.IS_FAILED)
    }
  }, [
    ethereum,
    account,
    externalAddress,
    rewardIndex,
    airdropQuantity,
    rewardProof,
    setConfirmTxModalIsOpen,
  ])

  return (
    <AirdropContext.Provider
      value={{
        externalAddress,
        airdropQuantity,
        claimableQuantity,
        rewardIndex,
        rewardProof,
        isClaimable,
        claimErrorMessage,
        onUpdateAddress: (val: string) => setExternalAddress(val),
        onCheckAirdropClaim,
        onClaimAirdrop,
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
    </AirdropContext.Provider>
  )
}

export default AirdropProvider

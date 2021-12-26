import React, { useCallback, useState } from 'react'

import ConfirmTransactionModal, {
  TransactionStatusType,
} from 'components/ConfirmTransactionModal'
import { V3Farm } from 'constants/v3Farms'
import useTransactionWatcher from 'hooks/useTransactionWatcher'
import useWallet from 'hooks/useWallet'
import {
  claimAccruedRewards,
  depositAndStake,
  getAccruedRewardsAmount,
  getAllDepositedTokens,
  getAllPendingRewardsAmount,
  getIndividualPendingRewardsAmount,
  getValidIds,
  withdraw,
} from 'index-sdk/uniV3Farm'
import BigNumber from 'utils/bignumber'
import { waitTransaction } from 'utils/index'

import Context from './Context'

const Provider: React.FC = ({ children }) => {
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false)

  const {
    transactionId,
    transactionStatus,
    onSetTransactionStatus,
    onSetTransactionId,
  } = useTransactionWatcher()

  const { account, ethereum } = useWallet()

  const handleDeposit = useCallback(
    async (id: number, farm: V3Farm) => {
      if (!ethereum || !account || !id) return

      setConfirmTxModalIsOpen(true)
      onSetTransactionStatus(TransactionStatusType.IS_APPROVING)

      const transactionId = await depositAndStake(id, farm, account, ethereum)

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
    },
    [
      ethereum,
      account,
      setConfirmTxModalIsOpen,
      onSetTransactionId,
      onSetTransactionStatus,
    ]
  )

  const handleWithdraw = useCallback(
    async (id: number, farm: V3Farm) => {
      if (!ethereum || !account || !id) return

      setConfirmTxModalIsOpen(true)
      onSetTransactionStatus(TransactionStatusType.IS_APPROVING)

      const transactionId = await withdraw(id, account, farm, ethereum)

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
    },
    [
      ethereum,
      account,
      setConfirmTxModalIsOpen,
      onSetTransactionId,
      onSetTransactionStatus,
    ]
  )

  const handleClaimAccrued = useCallback(
    async (rewardToken: string) => {
      if (!ethereum || !account) return

      setConfirmTxModalIsOpen(true)
      onSetTransactionStatus(TransactionStatusType.IS_APPROVING)

      const transactionId = await claimAccruedRewards(
        account,
        rewardToken,
        ethereum
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
    },
    [
      ethereum,
      account,
      setConfirmTxModalIsOpen,
      onSetTransactionId,
      onSetTransactionStatus,
    ]
  )

  const handleGetAccruedRewardsAmount = useCallback(
    async (rewardToken: string) => {
      if (!ethereum || !account || !rewardToken) return

      return await getAccruedRewardsAmount(account, rewardToken, ethereum)
    },
    [ethereum, account]
  )

  const handleGetValidIds = useCallback(
    async (farm: V3Farm) => {
      if (!ethereum || !account || !farm) return

      return await getValidIds(farm, account, ethereum)
    },
    [ethereum, account]
  )

  const handleGetDepositedTokens = useCallback(
    async (farm: V3Farm) => {
      if (!ethereum || !account || !farm) return

      return await getAllDepositedTokens(account, farm, ethereum)
    },
    [ethereum, account]
  )

  const handleGetAllPendingRewardsAmount = useCallback(
    async (farm: V3Farm) => {
      if (!ethereum || !account || !farm) return

      return await getAllPendingRewardsAmount(account, farm, ethereum)
    },
    [ethereum, account]
  )

  const handleGetIndividualPendingRewardsAmount = useCallback(
    async (farm: V3Farm, nftId: number) => {
      if (!ethereum || !account || !farm) return new BigNumber(0)

      return await getIndividualPendingRewardsAmount(
        account,
        farm,
        nftId,
        ethereum
      )
    },
    [ethereum, account]
  )

  return (
    <Context.Provider
      value={{
        onDeposit: handleDeposit,
        onWithdraw: handleWithdraw,
        onClaimAccrued: handleClaimAccrued,
        getAccruedRewardsAmount: handleGetAccruedRewardsAmount,
        getValidIds: handleGetValidIds,
        getAllDepositedTokens: handleGetDepositedTokens,
        getAllPendingRewardsAmount: handleGetAllPendingRewardsAmount,
        getIndividualPendingRewardsAmount:
          handleGetIndividualPendingRewardsAmount,
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

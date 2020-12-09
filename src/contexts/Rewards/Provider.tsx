import React, { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'
import BigNumber from 'utils/bignumber'

import Context from './Context'
import ConfirmTransactionModal, {
  TransactionStatusType,
} from 'components/ConfirmTransactionModal'
import useWallet from 'hooks/useWallet'
import { claimRewards, getUnclaimedRewards } from 'index-sdk/rewards'
import { waitTransaction } from 'utils/index'
import {
  checkIsAirdropClaimed,
  getAirdropDataForAddress,
} from '../../index-sdk'

const Provider: React.FC = ({ children }) => {
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false)
  const [transactionStatusType, setTransactionStatusType] = useState<
    TransactionStatusType | undefined
  >()
  const [amount, setAmount] = useState<BigNumber>(new BigNumber(0))
  const { account, ethereum } = useWallet()

  const checkClaimStatus = useCallback(async () => {
    //if (!ethereum || !account) return
    setAmount(await getUnclaimedRewards(ethereum as provider, account || ''))
  }, [ethereum, account])

  const handleClaim = useCallback(async () => {
    if (!ethereum || !account) {
      return
    }

    setConfirmTxModalIsOpen(true)
    setTransactionStatusType(TransactionStatusType.IS_APPROVING)

    const transactionId = await claimRewards(ethereum as provider, account)

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
    checkClaimStatus()
  }, [ethereum, account, checkClaimStatus, handleClaim])

  return (
    <Context.Provider
      value={{
        onClaim: handleClaim,
        amount: amount,
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

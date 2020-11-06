import React, { useMemo } from 'react'

export enum TransactionStatusType {
  IS_UNSTARTED,
  IS_APPROVING,
  IS_PENDING,
  IS_COMPLETED,
  IS_FAILED,
  IS_LONG,
}

interface TransactionWatcherProps {
  transactionMiningStatus?: TransactionStatusType
  startTransactionComponent?: any
  pendingTransactionComponent?: any
  approvingTransactionComponent?: any
  completedTransactionComponent?: any
  failedTransactionComponent?: any
  longTransactionComponent?: any
}

const ConfirmTransactionModal: React.FC<TransactionWatcherProps> = ({
  transactionMiningStatus,
  startTransactionComponent,
  pendingTransactionComponent,
  approvingTransactionComponent,
  completedTransactionComponent,
  failedTransactionComponent,
  longTransactionComponent,
}) => {
  switch (transactionMiningStatus) {
    case TransactionStatusType.IS_UNSTARTED:
      return startTransactionComponent

    case TransactionStatusType.IS_APPROVING:
      return approvingTransactionComponent

    case TransactionStatusType.IS_PENDING:
      return pendingTransactionComponent

    case TransactionStatusType.IS_COMPLETED:
      return completedTransactionComponent

    case TransactionStatusType.IS_FAILED:
      return failedTransactionComponent

    case TransactionStatusType.IS_LONG:
      return longTransactionComponent

    default:
      return null
  }
}

export default ConfirmTransactionModal

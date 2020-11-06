import React, { useMemo } from 'react'
import PendingTransaction from './PendingTransaction'

export enum TransactionStatusType {
  IS_UNSTARTED,
  IS_APPROVING,
  IS_PENDING,
  IS_COMPLETED,
  IS_FAILED,
  IS_LONG,
}

interface TransactionWatcherProps {
  transactionStatus?: TransactionStatusType
  startTransactionComponent?: any
  pendingTransactionComponent?: any
  approvingTransactionComponent?: any
  completedTransactionComponent?: any
  failedTransactionComponent?: any
  longTransactionComponent?: any
}

const ConfirmTransactionModal: React.FC<TransactionWatcherProps> = ({
  transactionStatus,
  startTransactionComponent,
  pendingTransactionComponent = <PendingTransaction />,
  approvingTransactionComponent,
  completedTransactionComponent,
  failedTransactionComponent,
  longTransactionComponent,
}) => {
  switch (transactionStatus) {
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

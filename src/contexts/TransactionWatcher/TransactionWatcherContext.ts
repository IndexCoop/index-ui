import { createContext } from 'react'

export enum TransactionStatusType {
  IS_UNSTARTED,
  IS_APPROVING,
  IS_PENDING,
  IS_COMPLETED,
  IS_FAILED,
  IS_LONG,
}

interface TransactionWatcherContext {
  transactionStatus?: TransactionStatusType
  transactionId?: string
  onSetTransactionId: (...args: any[]) => any
  onSetTransactionStatus: (...args: any[]) => any
}

export default createContext<TransactionWatcherContext>({
  onSetTransactionId: () => {},
  onSetTransactionStatus: () => {},
})

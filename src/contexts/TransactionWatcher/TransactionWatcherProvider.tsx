import React, { useState, useEffect } from 'react'

import TransactionWatcherContext, {
  TransactionStatusType,
} from './TransactionWatcherContext'

const TransactionWatcherProvider: React.FC = ({ children }) => {
  const [transactionId, setTransactionId] = useState<string>()
  const [transactionStatus, setTransactionStatus] = useState<
    TransactionStatusType
  >(TransactionStatusType.IS_UNSTARTED)

  return (
    <TransactionWatcherContext.Provider
      value={{
        transactionId,
        transactionStatus,
        onSetTransactionId: setTransactionId,
        onSetTransactionStatus: setTransactionStatus,
      }}
    >
      {children}
    </TransactionWatcherContext.Provider>
  )
}

export default TransactionWatcherProvider

import { useContext } from 'react'

import { TransactionWatcherContext } from 'contexts/TransactionWatcher'

const useTransactionWatcher = () => {
  return { ...useContext(TransactionWatcherContext) }
}

export default useTransactionWatcher

import React from 'react'

import TransactionWatcher from 'components/TransactionWatcher'
import { BuySellWidget } from 'components/BuySell'
import useTransactionWatcher from 'hooks/useTransactionWatcher'

const BuySellWrapper: React.FC = () => {
  const { transactionStatus } = useTransactionWatcher()

  return (
    <TransactionWatcher
      transactionStatus={transactionStatus}
      startTransactionComponent={<BuySellWidget />}
    />
  )
}

export default BuySellWrapper

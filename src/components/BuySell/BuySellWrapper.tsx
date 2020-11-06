import React from 'react'

import useBuySell from 'hooks/useBuySell'
import TransactionWatcher from 'components/TransactionWatcher'
import { BuySellWidget } from 'components/BuySell'

const BuySellWrapper: React.FC = () => {
  const { transactionStatusType } = useBuySell()

  return (
    <TransactionWatcher
      transactionStatus={transactionStatusType}
      startTransactionComponent={<BuySellWidget />}
    />
  )
}

export default BuySellWrapper

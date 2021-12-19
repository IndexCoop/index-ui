import React, { useEffect } from 'react'

import { BuySellWidget } from 'components/BuySell'
import TransactionWatcher from 'components/TransactionWatcher'
import useBuySell from 'hooks/useBuySell'
import useTransactionWatcher from 'hooks/useTransactionWatcher'

const BuySellWrapper = (props: { tokenId: string }) => {
  const { transactionStatus } = useTransactionWatcher()
  const { onSetBuySellToken } = useBuySell()

  useEffect(() => {
    onSetBuySellToken(props.tokenId)
  }, [onSetBuySellToken, props.tokenId])

  return (
    <TransactionWatcher
      transactionStatus={transactionStatus}
      startTransactionComponent={<BuySellWidget />}
    />
  )
}

export default BuySellWrapper

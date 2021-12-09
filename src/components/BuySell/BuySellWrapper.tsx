import React, { useEffect } from 'react'

import TransactionWatcher from 'components/TransactionWatcher'
import { BuySellWidget } from 'components/BuySell'
import useTransactionWatcher from 'hooks/useTransactionWatcher'
import useBuySell from 'hooks/useBuySell'

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

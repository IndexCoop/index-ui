import React, { useEffect } from 'react'

import TransactionWatcher from 'components/TransactionWatcher'
import { BuySellWidget } from 'components/BuySell'
import useTransactionWatcher from 'hooks/useTransactionWatcher'
import useBuySell from 'hooks/useBuySell'

interface BuySellWrapperProps {
  tokenId: 'index' | 'dpi' | 'cgi'
}

const BuySellWrapper: React.FC<BuySellWrapperProps> = ({ tokenId }: any) => {
  const { transactionStatus } = useTransactionWatcher()
  const { onSetBuySellToken } = useBuySell()

  useEffect(() => {
    onSetBuySellToken(tokenId)
  }, [])

  return (
    <TransactionWatcher
      transactionStatus={transactionStatus}
      startTransactionComponent={<BuySellWidget />}
    />
  )
}

export default BuySellWrapper

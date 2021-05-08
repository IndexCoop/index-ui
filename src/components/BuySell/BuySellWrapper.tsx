import React, { useEffect } from 'react'

import TransactionWatcher from 'components/TransactionWatcher'
import { BuySellWidget } from 'components/BuySell'
import useTransactionWatcher from 'hooks/useTransactionWatcher'
import useBuySell from 'hooks/useBuySell'

interface BuySellWrapperProps {
  tokenId: 'index' | 'dpi' | 'ethfli' | 'mvi' | 'cgi'
}

const BuySellWrapper: React.FC<BuySellWrapperProps> = ({ tokenId }: any) => {
  const { transactionStatus } = useTransactionWatcher()
  const { onSetBuySellToken } = useBuySell()

  useEffect(() => {
    onSetBuySellToken(tokenId)
  }, [onSetBuySellToken, tokenId])

  return (
    <TransactionWatcher
      transactionStatus={transactionStatus}
      startTransactionComponent={<BuySellWidget tokenId={tokenId} />}
    />
  )
}

export default BuySellWrapper

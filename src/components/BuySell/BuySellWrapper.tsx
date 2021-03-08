import React, { useEffect, useState } from 'react'

import TransactionWatcher from 'components/TransactionWatcher'
import { BuySellWidget } from 'components/BuySell'
import useTransactionWatcher from 'hooks/useTransactionWatcher'
import useBuySell from 'hooks/useBuySell'

import { ExchangeIssuanceWidget } from 'components/ExchangeIssuance'
import useExchangeIssuance from 'hooks/useExchangeIssuance'

interface BuySellWrapperProps {
  tokenId: 'index' | 'dpi' | 'cgi'
}

const BuySellWrapper: React.FC<BuySellWrapperProps> = ({ tokenId }: any) => {
  const { transactionStatus } = useTransactionWatcher()
  const { onSetBuySellToken } = useBuySell()
  const { onSetIssuanceToken } = useExchangeIssuance()

  const [isIssuance, setIsIssuance] = useState(false)

  useEffect(() => {
    onSetBuySellToken(tokenId)
  }, [onSetBuySellToken, tokenId])

  useEffect(() => {
    onSetIssuanceToken(tokenId)
  }, [onSetIssuanceToken, tokenId])

  return !isIssuance ? (
    <TransactionWatcher
      transactionStatus={transactionStatus}
      startTransactionComponent={
        <BuySellWidget setIsIssuance={setIsIssuance} />
      }
    />
  ) : (
    <TransactionWatcher
      transactionStatus={transactionStatus}
      startTransactionComponent={<ExchangeIssuanceWidget />}
    />
  )
}

export default BuySellWrapper

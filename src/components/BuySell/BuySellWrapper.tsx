import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import TransactionWatcher from 'components/TransactionWatcher'
import { BuySellWidget } from 'components/BuySell'
import { ExchangeSelector } from 'components/ExchangeSelector'
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
  const { onSetIssuanceToken, isIssuance } = useExchangeIssuance()

  useEffect(() => {
    onSetBuySellToken(tokenId)
  }, [onSetBuySellToken, tokenId])

  useEffect(() => {
    onSetIssuanceToken(tokenId)
  }, [onSetIssuanceToken, tokenId])

  if (tokenId === 'index') {
    return (
      <TransactionWatcher
        transactionStatus={transactionStatus}
        startTransactionComponent={<BuySellWidget />}
      />
    )
  }

  if (!isIssuance) {
    return (
      <StyledDiv>
        <TransactionWatcher
          transactionStatus={transactionStatus}
          startTransactionComponent={<BuySellWidget />}
        />
        <ExchangeSelector />
      </StyledDiv>
    )
  } else {
    return (
      <StyledDiv>
        <TransactionWatcher
          transactionStatus={transactionStatus}
          startTransactionComponent={<ExchangeIssuanceWidget />}
        />
        <ExchangeSelector />
      </StyledDiv>
    )
  }
}

const StyledDiv = styled.div`
  position: relative;
`

export default BuySellWrapper

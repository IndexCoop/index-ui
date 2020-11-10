import React from 'react'
import { Spacer } from 'react-neu'
import styled from 'styled-components'

import ExternalLink from 'components/ExternalLink'
import useTransactionWatcher from 'hooks/useTransactionWatcher'
import { makeEtherscanLink } from 'utils/index'
import { TransactionStatusType } from 'contexts/TransactionWatcher/TransactionWatcherContext'
import { RoundedButton } from 'components/RoundedButton'

const LongTransaction: React.FC = () => {
  const {
    transactionId,
    onSetTransactionId,
    onSetTransactionStatus,
  } = useTransactionWatcher()

  const etherscanLink = transactionId && makeEtherscanLink(transactionId)

  const onFinishTransaction = () => {
    onSetTransactionId()
    onSetTransactionStatus(TransactionStatusType.IS_UNSTARTED)
  }

  return (
    <StyledCard>
      <StyledCardBody>Your transaction is still processing</StyledCardBody>
      <ExternalLink href={etherscanLink} target='_blank'>
        View the transaction{' '}
        <img src='https://index-dao.s3.amazonaws.com/external-arrow.svg' />
      </ExternalLink>
      <Spacer />
      <RoundedButton text='Finish' onClick={onFinishTransaction} />
    </StyledCard>
  )
}

const StyledCard = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.transparentColors.grey};
  border-radius: ${(props) => props.theme.borderRadius}px;
`

const StyledCardBody = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 10px;
`

export default LongTransaction

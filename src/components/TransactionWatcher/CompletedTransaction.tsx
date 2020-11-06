import React from 'react'
import { useTheme, Spacer } from 'react-neu'
import styled from 'styled-components'

import ExternalLink from 'components/ExternalLink'
import useTransactionWatcher from 'hooks/useTransactionWatcher'
import { makeEtherscanLink } from 'utils/index'
import { TransactionStatusType } from 'contexts/TransactionWatcher/TransactionWatcherContext'
import { BasicButton } from 'components/BasicButton'

const CompletedTransaction: React.FC = () => {
  const theme = useTheme()
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
      <StyledIcon
        src='https://index-dao.s3.amazonaws.com/green-check.svg'
        alt='check mark'
      />
      <StyledCardBody>Your transaction succeeded!</StyledCardBody>
      <ExternalLink href={etherscanLink} target='_blank'>
        View the transaction
      </ExternalLink>
      <Spacer />
      <BasicButton text='Finish' onClick={onFinishTransaction} />
    </StyledCard>
  )
}

const StyledCard = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.grey[600]};
  border-radius: ${(props) => props.theme.borderRadius}px;
`

const StyledIcon = styled.img`
  width: 55px;
  height: 55px;
`

const StyledCardBody = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-top: 40px;
  margin-bottom: 10px;
`

export default CompletedTransaction

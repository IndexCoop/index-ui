import React from 'react'
import { useTheme } from 'react-neu'
import styled from 'styled-components'
import MoonLoader from 'react-spinners/MoonLoader'

import ExternalLink from 'components/ExternalLink'
import useTransactionWatcher from 'hooks/useTransactionWatcher'
import { makeEtherscanLink } from 'utils/index'

const PendingTransaction: React.FC = () => {
  const theme = useTheme()
  const { transactionId } = useTransactionWatcher()

  const etherscanLink = transactionId && makeEtherscanLink(transactionId)

  return (
    <StyledCard>
      <MoonLoader color={theme.textColor} size={30} />
      <StyledCardBody>Your transaction is pending</StyledCardBody>
      <ExternalLink href={etherscanLink} target='_blank'>
        View the transaction
      </ExternalLink>
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

const StyledCardBody = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-top: 40px;
  margin-bottom: 10px;
`

export default PendingTransaction

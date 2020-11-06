import React from 'react'
import styled from 'styled-components'

interface PendingTransactionProps {
  onDismiss?: (...args: any[]) => any
}

const PendingTransaction: React.FC<PendingTransactionProps> = ({
  onDismiss,
}) => {
  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>Confirmation</StyledCardTitle>
      </StyledCardHeader>
      <StyledCardBody>Please confirm your transaction</StyledCardBody>
    </StyledCard>
  )
}

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.grey[600]};
  border-radius: ${(props) => props.theme.borderRadius}px;
`

const StyledCardHeader = styled.div`
  display: flex;
  align-items: center;
`

const StyledCardTitle = styled.h3`
  font-size: 16px;
  margin: 0px;
`

const StyledCardBody = styled.p`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`

export default PendingTransaction

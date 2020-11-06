import React from 'react'
import styled from 'styled-components'
import MoonLoader from 'react-spinners/MoonLoader'

import { useTheme } from 'react-neu'

interface ApprovingTransactionProps {
  onDismiss?: (...args: any[]) => any
}

const ApprovingTransaction: React.FC<ApprovingTransactionProps> = ({
  onDismiss,
}) => {
  const theme = useTheme()
  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>Confirmation</StyledCardTitle>
      </StyledCardHeader>
      <MoonLoader color={theme.textColor} size={30} />
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
  margin-bottom: 40px;
`

const StyledCardTitle = styled.h3`
  font-size: 16px;
  margin: 0px;
`

const StyledCardBody = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-top: 40px;
`

export default ApprovingTransaction

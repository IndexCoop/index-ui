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
      <MoonLoader color={theme.textColor} size={30} />
      <StyledCardBody>Please confirm your transaction</StyledCardBody>
    </StyledCard>
  )
}

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.transparentColors.grey};
  border-radius: ${(props) => props.theme.borderRadius}px;
`

const StyledCardBody = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
`

export default ApprovingTransaction

import React from 'react'
import styled from 'styled-components'
import MoonLoader from 'react-spinners/MoonLoader'

import { useTheme } from 'react-neu'

const PendingTransaction: React.FC = () => {
  const theme = useTheme()

  return (
    <StyledCard>
      <MoonLoader color={theme.textColor} size={30} />
      <StyledCardBody>Your transaction is pending</StyledCardBody>
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
`

export default PendingTransaction

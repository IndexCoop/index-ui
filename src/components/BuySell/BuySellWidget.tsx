import React from 'react'
import styled from 'styled-components'

import { Surface } from 'react-neu'

const BuyTokenPlaceholder: React.FC = () => {
  return (
    <StyledBuySellCard>
      <Surface>
        <StyledBuySellCardContent>
          <StyledCardHeader>
            <StyledActiveButton>Buy</StyledActiveButton>
            <StyledActiveButton>Sell</StyledActiveButton>
          </StyledCardHeader>
          <StyledInputField type='number' />
          <StyledInputField type='number' />
          <StyledSubmitButton>Review</StyledSubmitButton>
        </StyledBuySellCardContent>
      </Surface>
    </StyledBuySellCard>
  )
}

const StyledBuySellCard = styled.div`
  max-height: 200px;
  @media (min-width: 768px) {
    max-height: 500px;
  }
`

const StyledBuySellCardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-height: 500px;
`

const StyledCardHeader = styled.div`
  display: flex;
  justify-content: center;
`

const StyledActiveButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  border-bottom: 1px solid white;
  width: 50%;
  padding-bottom: 20px;
  margin-bottom: 20px;
  cursor: pointer;
`

const StyledInputField = styled.input`
  color: white;
  font-size: 16px;
  width: 90%;
  cursor: pointer;
  margin: 20px 0;
  padding: 10px;
  border-radius: 4px;
`

const StyledSubmitButton = styled.button`
  color: white;
  border-radius: 20px;
  width: 90%;
`

// color: ${(props) => props.theme.colors.primary.grey};
export default BuyTokenPlaceholder

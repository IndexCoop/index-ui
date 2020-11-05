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

          <StyledCurrencyContainer>
            <span>Pay with</span>
            <StyledCurrencySelectWrapper>
              <StyledInputField type='number' />
              <StyledSelectField>
                <option value='eth'>ETH</option>
                <option value='dai'>DAI</option>
                <option value='usdc'>USDC</option>
              </StyledSelectField>
            </StyledCurrencySelectWrapper>
          </StyledCurrencyContainer>

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
  align-items: center;
  padding: 20px;
`

const StyledCardHeader = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
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

const StyledCurrencyContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: lightblue;
  padding: 10px;
  border-radius: 4px;
`

const StyledTokenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledCurrencySelectWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledInputField = styled.input`
  font-size: 16px;
  width: 90%;
  cursor: pointer;
  margin: 20px 0;
  padding: 10px;
  border-radius: 4px;
  background-color: none;
  border: none;
`

const StyledSelectField = styled.select`
  font-size: 16px;
  cursor: pointer;
  margin: 20px 0;
  padding: 10px;
  border-radius: 4px;
  background-color: none;
  border: none;
`

const StyledSubmitButton = styled.button`
  font-size: 20px;
  border-radius: 20px;
  width: 90%;
  padding: 5px;
`

// color: ${(props) => props.theme.colors.primary.grey};
export default BuyTokenPlaceholder

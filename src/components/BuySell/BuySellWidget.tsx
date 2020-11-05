import React from 'react'
import styled from 'styled-components'
import Select from 'react-select'

import { Surface } from 'react-neu'

const BuyTokenPlaceholder: React.FC = () => {
  const options = [
    {
      value: 'eth',
      label: 'ETH',
    },
    {
      value: 'dai',
      label: 'DAI',
    },
    {
      value: 'usdc',
      label: 'USDC',
    },
  ]

  return (
    <StyledBuySellCard>
      <StyledBuySellCardContent>
        <StyledCardHeader>
          <StyledBuySellButton>Buy</StyledBuySellButton>
          <StyledActiveButton>Sell</StyledActiveButton>
        </StyledCardHeader>

        <StyledCurrencyContainer>
          <span>Pay with</span>
          <StyledCurrencySelectWrapper>
            <StyledInputField placeholder='0' type='number' />
            <StyledSelectField options={options} />
          </StyledCurrencySelectWrapper>
        </StyledCurrencyContainer>

        <StyledInputField type='number' />
        <StyledSubmitButton>Review</StyledSubmitButton>
      </StyledBuySellCardContent>
    </StyledBuySellCard>
  )
}

const StyledBuySellCard = styled.div`
  max-height: 200px;
  background-color: ${(props) => props.theme.colors.grey[600]};
  border-radius: ${(props) => props.theme.borderRadius}px;
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

const StyledBuySellButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  font-weight: 600;
  border-bottom: 1px solid white;
  width: 50%;
  padding-bottom: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.primary.light};
    border-bottom: 1px solid ${(props) => props.theme.colors.primary.light};
  }
`

const StyledActiveButton = styled.button`
  background: none;
  border: none;
  font-weight: 600;
  font-size: 20px;
  width: 50%;
  padding-bottom: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.primary.light};
  border-bottom: 1px solid ${(props) => props.theme.colors.primary.light};
`

const StyledCurrencyContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.grey[500]};
  padding: 10px;
  border-radius: ${(props) => props.theme.borderRadius}px;
  margin-bottom: 20px;
`

const StyledCurrencySelectWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledInputField = styled.input`
  font-size: 16px;
  flex: 1;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
  padding: 10px;
  border-radius: 4px;
  background: none;
  border: none;
`

const StyledSelectField = styled(Select)`
  font-size: 16px;
  cursor: pointer;
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

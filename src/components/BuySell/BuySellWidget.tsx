import React from 'react'
import styled from 'styled-components'
import Select from 'react-select'

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

  const selectStyles = {
    control: (styles: any) => ({
      ...styles,
      width: 100,
      background: 'none',
      border: 'none',
      color: 'white',
    }),
    singleValue: (styles: any) => ({
      ...styles,
      color: 'white',
      fontWeight: 600,
      fontSize: 20,
    }),
    menu: (styles: any) => ({
      ...styles,
      color: 'black',
    }),
    indicatorSeparator: () => ({}),
    indicatorsContainer: (styles: any) => ({
      ...styles,
      marginLeft: 0,
    }),
  }

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
            <StyledInputField value='0' type='number' />
            <Select
              value={options[0]}
              options={options}
              styles={selectStyles}
            />
          </StyledCurrencySelectWrapper>
        </StyledCurrencyContainer>

        <StyledCurrencyContainer>
          <span>Buy (estimated)</span>
          <StyledCurrencySelectWrapper>
            <StyledInputField value='0' type='number' />
            <StyledTargetTokenSymbol>DPI</StyledTargetTokenSymbol>
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

const StyledTargetTokenSymbol = styled.span`
  font-size: 20px;
  font-weight: 600;
`

const StyledSubmitButton = styled.button`
  font-size: 20px;
  border-radius: 20px;
  width: 90%;
  padding: 10px;
  font-weight: 600;
  background-color: ${(props) => props.theme.colors.primary.main};
  color: ${(props) => props.theme.colors.white};
  border: none;
`

// color: ${(props) => props.theme.colors.primary.grey};
export default BuyTokenPlaceholder

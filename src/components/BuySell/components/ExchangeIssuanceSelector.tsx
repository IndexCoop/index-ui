import React from 'react'
import styled from 'styled-components'

import useBuySell from 'hooks/useBuySell'

const BuySellSelector: React.FC = () => {
  const { isUsingExchangeIssuance, onToggleIsUsingExchangeIssuance } =
    useBuySell()

  if (isUsingExchangeIssuance) {
    return (
      <StyledCardHeader>
        <StyledExchangeIssuanceButton onClick={onToggleIsUsingExchangeIssuance}>
          Swap
        </StyledExchangeIssuanceButton>
        <StyledActiveButton>Exchange Issuance</StyledActiveButton>
      </StyledCardHeader>
    )
  }

  return (
    <StyledCardHeader>
      <StyledActiveButton>Swap</StyledActiveButton>
      <StyledExchangeIssuanceButton onClick={onToggleIsUsingExchangeIssuance}>
        Exchange Issuance
      </StyledExchangeIssuanceButton>
    </StyledCardHeader>
  )
}

const StyledCardHeader = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const StyledExchangeIssuanceButton = styled.button`
  width: 50%;
  background: none;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.colors.grey[400]};
  color: ${(props) => props.theme.colors.grey[400]};
  padding-bottom: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  outline: none;
  &:hover {
    border-bottom: 2px solid ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.textColor};
  }
`

const StyledActiveButton = styled.button`
  width: 50%;
  background: none;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.colors.primary.light};
  color: ${(props) => props.theme.colors.primary.light};
  padding-bottom: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  outline: none;
`

export default BuySellSelector

import React from 'react'
import styled from 'styled-components'

import useBuySell from 'hooks/useBuySell'

const BuySellSelector: React.FC = () => {
  const {
    isUsingExchangeIssuance,
    onToggleIsUsingExchangeIssuance,
    isUserBuying,
  } = useBuySell()

  const exchangeIssuanceLabel = isUserBuying ? 'Issue' : 'Redeem'

  if (isUsingExchangeIssuance) {
    return (
      <StyledCardHeader>
        <StyledBuySellButton onClick={onToggleIsUsingExchangeIssuance}>
          Swap
        </StyledBuySellButton>
        <StyledActiveButton>{exchangeIssuanceLabel}</StyledActiveButton>
      </StyledCardHeader>
    )
  }

  return (
    <StyledCardHeader>
      <StyledActiveButton>Swap</StyledActiveButton>
      <StyledBuySellButton onClick={onToggleIsUsingExchangeIssuance}>
        {exchangeIssuanceLabel}
      </StyledBuySellButton>
    </StyledCardHeader>
  )
}

const StyledCardHeader = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const StyledBuySellButton = styled.button`
  width: 50%;
  background: none;
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.colors.grey[400]};
  color: ${(props) => props.theme.colors.grey[400]};
  padding-bottom: 20px;
  margin-bottom: 20px;
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
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.colors.primary.light};
  color: ${(props) => props.theme.colors.primary.light};
  padding-bottom: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  outline: none;
`

export default BuySellSelector

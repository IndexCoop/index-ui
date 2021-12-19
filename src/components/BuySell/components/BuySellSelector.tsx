import React from 'react'

import styled from 'styled-components'

import useBuySell from 'hooks/useBuySell'

const BuySellSelector: React.FC = () => {
  const { isUserBuying, onToggleIsUserBuying } = useBuySell()

  const buyLabel = 'Buy'
  const sellLabel = 'Sell'

  if (isUserBuying) {
    return (
      <StyledCardHeader>
        <StyledActiveButton>{buyLabel}</StyledActiveButton>
        <StyledBuySellButton onClick={onToggleIsUserBuying}>
          {sellLabel}
        </StyledBuySellButton>
      </StyledCardHeader>
    )
  }

  return (
    <StyledCardHeader>
      <StyledBuySellButton onClick={onToggleIsUserBuying}>
        {buyLabel}
      </StyledBuySellButton>
      <StyledActiveButton>{sellLabel}</StyledActiveButton>
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

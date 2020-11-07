import React from 'react'
import styled from 'styled-components'

import useBuySell from 'hooks/useBuySell'

const BuySellSelector: React.FC = () => {
  const { isUserBuying, onToggleIsUserBuying } = useBuySell()

  if (isUserBuying) {
    return (
      <StyledCardHeader>
        <StyledActiveButton>Buy</StyledActiveButton>
        <StyledBuySellButton onClick={onToggleIsUserBuying}>
          Sell
        </StyledBuySellButton>
      </StyledCardHeader>
    )
  }

  return (
    <StyledCardHeader>
      <StyledBuySellButton onClick={onToggleIsUserBuying}>
        Buy
      </StyledBuySellButton>
      <StyledActiveButton>Sell</StyledActiveButton>
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
  color: white;
  background: none;
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-bottom: 2px solid white;
  padding-bottom: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  outline: none;
  &:hover {
    color: ${(props) => props.theme.colors.grey[400]};
    border-bottom: 2px solid ${(props) => props.theme.colors.grey[400]};
  }
`

const StyledActiveButton = styled.button`
  width: 50%;
  color: ${(props) => props.theme.colors.primary.light};
  background: none;
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary.light};
  padding-bottom: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  outline: none;
`

export default BuySellSelector

import React from 'react'

import styled from 'styled-components'

import BuySellButton from './components/BuySellButton'
import BuySellSelector from './components/BuySellSelector'
import OrderSummary from './components/OrderSummary'
import TokenInputs from './components/TokenInputs'

const BuySellWidget = () => {
  return (
    <StyledBuySellCard data-cy='buy-sell-selector'>
      <StyledBuySellCardContent>
        <BuySellSelector />
        <TokenInputs />
        <OrderSummary />
        <BuySellButton />
      </StyledBuySellCardContent>
    </StyledBuySellCard>
  )
}

const StyledBuySellCard = styled.div`
  height: fit-content;
  background-color: ${(props) => props.theme.colors.transparentColors.grey};
  border-radius: ${(props) => props.theme.borderRadius}px;
`

const StyledBuySellCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-bottom: 30px;
`

export default BuySellWidget

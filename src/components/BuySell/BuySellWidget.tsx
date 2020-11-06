import React from 'react'
import styled, { css } from 'styled-components'

import useBuySell from 'hooks/useBuySell'
import { BasicButton } from 'components/BasicButton'
import BuySellSelector from './components/BuySellSelector'
import TokenInputs from './components/TokenInputs'
import OrderSummary from './components/OrderSummary'

const BuyTokenPlaceholder: React.FC = () => {
  const {
    isFetchingOrderData,
    currencyQuantity,
    tokenQuantity,
    onExecuteBuySell,
  } = useBuySell()

  return (
    <StyledBuySellCard>
      <StyledBuySellCardContent>
        <BuySellSelector />

        <TokenInputs />

        <OrderSummary />

        <BasicButton
          isDisabled={currencyQuantity <= 0 && tokenQuantity <= 0}
          isPending={isFetchingOrderData}
          text={'Buy'}
          onClick={onExecuteBuySell}
        />
      </StyledBuySellCardContent>
    </StyledBuySellCard>
  )
}

const StyledBuySellCard = styled.div`
  background-color: ${(props) => props.theme.colors.transparentColors.grey};
  border-radius: ${(props) => props.theme.borderRadius}px;
`

const StyledBuySellCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`

export default BuyTokenPlaceholder

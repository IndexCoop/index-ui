import React, { ComponentProps } from 'react'
import styled from 'styled-components'

import BuySellSelector from './components/BuySellSelector'
import TokenInputs from './components/TokenInputs'
import OrderSummary from './components/OrderSummary'
import BuySellButton from './components/BuySellButton'
import HowToBuyLink from './components/HowToBuyLink'
import ExchangeSelector from './components/ExchangeSelector'

interface Props {
  setIsIssuance: any
}

const BuySellWidget: React.FC<Props> = ({ setIsIssuance }) => {
  return (
    <StyledContainer>
      <StyledBuySellCard>
        <StyledBuySellCardContent>
          <BuySellSelector />
          <TokenInputs />
          <OrderSummary />
          <BuySellButton />
          <HowToBuyLink />
        </StyledBuySellCardContent>
      </StyledBuySellCard>
      <ExchangeSelector setIsIssuance={setIsIssuance} />
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  position: relative;
`

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

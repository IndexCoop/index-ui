import React from 'react'
import styled from 'styled-components'

import IssueRedeemSelector from './components/IssueRedeemSelector'
import TokenInputs from './components/TokenInputs'
import OrderSummary from './components/OrderSummary'
import IssueRedeemButton from './components/IssueRedeemButton'
import HowToBuyLink from './components/HowToBuyLink'

const ExchangeIssuanceWidget: React.FC = () => {
  return (
    <StyledBuySellCard>
      <StyledBuySellCardContent>
        <IssueRedeemSelector />
        <TokenInputs />
        <OrderSummary />
        <IssueRedeemButton />
        <HowToBuyLink />
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

export default ExchangeIssuanceWidget

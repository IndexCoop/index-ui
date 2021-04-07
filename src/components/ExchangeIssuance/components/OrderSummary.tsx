import React from 'react'
import styled, { css } from 'styled-components'

import useExchangeIssuance from 'hooks/useExchangeIssuance'

const OrderSummary: React.FC = () => {
  const { isFetchingOrderData, issuanceData } = useExchangeIssuance()

  const isOrderDataReady =
    Number(issuanceData?.amountOut) > 0 && !isFetchingOrderData

  if (isOrderDataReady) {
    return (
      <StyledOrderSummaryContainer>
        <StyledOrderSummaryLabel>Minimum Receive</StyledOrderSummaryLabel>
        <StyledOrderSummaryValue>
          {issuanceData?.amountOut}
        </StyledOrderSummaryValue>

        {/* <StyledOrderSummaryLabel>Price Impact</StyledOrderSummaryLabel>
        <StyledOrderSummaryValue>
          {issuanceData?.display?.slippage}
        </StyledOrderSummaryValue> */}

        <StyledOrderSummaryLabel>Network Fee</StyledOrderSummaryLabel>
        <StyledOrderSummaryValue>
          {issuanceData?.gasCost}
        </StyledOrderSummaryValue>

        {/* <StyledOrderSummaryLabel>Offered From</StyledOrderSummaryLabel>
        <StyledOrderSummaryValue>Uniswap</StyledOrderSummaryValue> */}
      </StyledOrderSummaryContainer>
    )
  }

  return null
}

const StyledOrderSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const StyledOrderSummaryLabel = styled.span`
  font-size: 14px;
  margin-bottom: 5px;
`

const StyledOrderSummaryValue = styled.span`
  font-size: 20px;
  margin-bottom: 20px;
`

export default OrderSummary

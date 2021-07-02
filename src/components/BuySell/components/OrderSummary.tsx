import React from 'react'
import styled from 'styled-components'

import useBuySell from 'hooks/useBuySell'

const OrderSummary: React.FC = () => {
  const { isFetchingOrderData, zeroExTradeData } = useBuySell()

  const isOrderDataReady =
    Number(zeroExTradeData?.buyAmount) > 0 && !isFetchingOrderData

  if (isOrderDataReady) {
    return (
      <StyledOrderSummaryContainer>
        <StyledOrderSummaryLabel>Minimum Receive</StyledOrderSummaryLabel>
        <StyledOrderSummaryValue>
          {zeroExTradeData?.minOutput.toFixed(6)}
        </StyledOrderSummaryValue>

        <StyledOrderSummaryLabel>Network Fee</StyledOrderSummaryLabel>
        <StyledOrderSummaryValue>
          {(parseFloat(zeroExTradeData?.gasPrice || '0') *
            parseFloat(zeroExTradeData?.gas || '0')) /
            1e18 +
            ' ETH'}
        </StyledOrderSummaryValue>

        <StyledOrderSummaryLabel>Offered From</StyledOrderSummaryLabel>
        <StyledOrderSummaryValue>
          {zeroExTradeData?.formattedSources}
        </StyledOrderSummaryValue>
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

const StyledOrderPremiumValue = styled.span`
  font-size: 20px;
  margin-bottom: 20px;
  ${(props: { highPremium: boolean }) =>
    props.highPremium &&
    `
         color: #ff4a4a;
    `}
`

export default OrderSummary

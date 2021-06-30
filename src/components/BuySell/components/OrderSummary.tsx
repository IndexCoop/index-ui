import React from 'react'
import styled from 'styled-components'

import useBuySell from 'hooks/useBuySell'

const OrderSummary: React.FC = () => {
  const { isFetchingOrderData, buySellToken, zeroExTradeData } = useBuySell()
  //const premiumStr = zeroExTradeData?.display?.slippage || '0.00%'
  //const highPremium = parseFloat(premiumStr) > 5

  const isOrderDataReady =
    Number(zeroExTradeData?.buyAmount) > 0 && !isFetchingOrderData

  const tradeOrigin = '0xAPI'

  if (isOrderDataReady) {
    return (
      <StyledOrderSummaryContainer>
        <StyledOrderSummaryLabel>Minimum Receive</StyledOrderSummaryLabel>
        <StyledOrderSummaryValue>
          {zeroExTradeData.minOutput.toFixed(6)}
        </StyledOrderSummaryValue>

        {/* <StyledOrderSummaryLabel>Premium</StyledOrderSummaryLabel>
        <StyledOrderPremiumValue highPremium={highPremium}>
          {uniswapData?.display?.slippage}
        </StyledOrderPremiumValue> */}

        <StyledOrderSummaryLabel>Network Fee</StyledOrderSummaryLabel>
        <StyledOrderSummaryValue>
          {(zeroExTradeData?.gasPrice * zeroExTradeData?.gas) / 1e18 + ' ETH'}
        </StyledOrderSummaryValue>

        <StyledOrderSummaryLabel>Offered From</StyledOrderSummaryLabel>
        <StyledOrderSummaryValue>{tradeOrigin}</StyledOrderSummaryValue>
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

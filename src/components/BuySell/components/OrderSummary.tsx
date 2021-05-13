import React from 'react'
import styled from 'styled-components'

import useBuySell from 'hooks/useBuySell'
import { Bitcoin2xFlexibleLeverageIndex } from 'constants/productTokens'

const OrderSummary: React.FC = () => {
  const { isFetchingOrderData, buySellToken, uniswapData } = useBuySell()
  const premiumStr = uniswapData?.display?.slippage || '0.00%'
  const highPremium = parseFloat(premiumStr) > 5

  const isOrderDataReady =
    Number(uniswapData?.amount_out) > 0 && !isFetchingOrderData

  const isSushiswapTrade =
    buySellToken === Bitcoin2xFlexibleLeverageIndex.tokensetsId
  const tradeOrigin = isSushiswapTrade ? 'Sushiswap' : 'Uniswap'

  if (isOrderDataReady) {
    return (
      <StyledOrderSummaryContainer>
        <StyledOrderSummaryLabel>Minimum Receive</StyledOrderSummaryLabel>
        <StyledOrderSummaryValue>
          {uniswapData?.display?.to_quantity}
        </StyledOrderSummaryValue>

        <StyledOrderSummaryLabel>Premium</StyledOrderSummaryLabel>
        <StyledOrderPremiumValue highPremium={highPremium}>
          {uniswapData?.display?.slippage}
        </StyledOrderPremiumValue>

        <StyledOrderSummaryLabel>Network Fee</StyledOrderSummaryLabel>
        <StyledOrderSummaryValue>
          {uniswapData?.display?.gas_price_eth}
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

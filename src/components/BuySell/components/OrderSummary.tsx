import React from 'react'

import styled from 'styled-components'

import useBuySell from 'hooks/useBuySell'
import useWallet from 'hooks/useWallet'
import { POLYGON_CHAIN_DATA } from 'utils/connectors'

const OrderSummary = () => {
  const { isFetchingOrderData, zeroExTradeData } = useBuySell()
  const { chainId } = useWallet()

  const isOrderDataReady =
    Number(zeroExTradeData?.buyAmount) > 0 && !isFetchingOrderData

  const getNetworkFee = () => {
    if (chainId && chainId === POLYGON_CHAIN_DATA.chainId) {
      return (
        (parseFloat(zeroExTradeData?.gasPrice || '0') *
          parseFloat(zeroExTradeData?.gas || '0')) /
          1e18 +
        ' MATIC'
      )
    }
    return (
      (parseFloat(zeroExTradeData?.gasPrice || '0') *
        parseFloat(zeroExTradeData?.gas || '0')) /
        1e18 +
      ' ETH'
    )
  }

  if (isOrderDataReady) {
    return (
      <StyledOrderSummaryContainer>
        <StyledOrderSummaryLabel>Minimum Receive</StyledOrderSummaryLabel>
        <StyledOrderSummaryValue>
          {zeroExTradeData?.minOutput.toFixed(6)}
        </StyledOrderSummaryValue>

        <StyledOrderSummaryLabel>Network Fee</StyledOrderSummaryLabel>
        <StyledOrderSummaryValue>{getNetworkFee()}</StyledOrderSummaryValue>

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

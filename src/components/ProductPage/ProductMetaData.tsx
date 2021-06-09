import React from 'react'
import styled from 'styled-components'
import numeral from 'numeral'
import { InputProps } from 'react-neu'
import { TokenDataProps } from './ProductDataUI'
import IndexComponent from 'components/IndexComponent'
import {
  Bitcoin2xFlexibleLeverageIndex,
  Ethereum2xFlexibleLeverageIndex,
} from 'constants/productTokens'

interface ProductMetaDataProps extends InputProps {
  tokenData: TokenDataProps
}

const ProductMetaData: React.FC<ProductMetaDataProps> = ({ tokenData }) => {
  const formatMetric = (metricValue: number) =>
    numeral(metricValue).format('0.00a').toString().toUpperCase()
  const formatLeverageMetric = (metricValue: number) =>
    numeral(metricValue).format('0.00').toString().toUpperCase()
  const formatDivergenceMetric = (metricValue: number) =>
    numeral(Math.abs(metricValue)).format('0.00').toString().toUpperCase()

  const isFLI =
    tokenData.token.symbol == Ethereum2xFlexibleLeverageIndex.symbol ||
    tokenData.token.symbol == Bitcoin2xFlexibleLeverageIndex.symbol

  const realLeverage = tokenData.components
    ? Number(tokenData.components[0].percentOfSet || 0) / 100
    : 2

  const netAssetValueReducer = (
    netAssetValue: number,
    component: IndexComponent
  ): number => {
    return netAssetValue + (parseFloat(component.totalPriceUsd) || 0)
  }

  const getNetAssetValue = () => {
    return tokenData.components
      ? tokenData.components.reduce(netAssetValueReducer, 0)
      : 0
  }

  const netAssetValueDivergence =
    ((tokenData.latestPrice || 0) - getNetAssetValue()) /
    (tokenData.latestPrice || 0)

  const divergenceLabel = netAssetValueDivergence > 1 ? 'Premium' : 'Discount'
  const divergenceLabelColor = netAssetValueDivergence > 1 ? 'red' : 'green'

  if (isFLI)
    return (
      <PriceStatsContainer>
        <StyledStat>
          <StyledStatTitle>Real Leverage</StyledStatTitle>
          <StyledStatMetric>
            {formatLeverageMetric(realLeverage)}x
          </StyledStatMetric>
        </StyledStat>
        <StyledStat>
          <StyledStatTitle>Target Leverage</StyledStatTitle>
          <StyledStatMetric>2x</StyledStatMetric>
        </StyledStat>
        <StyledStat>
          <StyledStatTitle>Supply Cap</StyledStatTitle>
          <StyledStatMetric>{tokenData.supplyCap}</StyledStatMetric>
        </StyledStat>
        <StyledStat>
          <StyledStatTitle>{divergenceLabel}</StyledStatTitle>
          <StyledStatMetric color={divergenceLabelColor}>
            {formatDivergenceMetric(netAssetValueDivergence)}%
          </StyledStatMetric>
        </StyledStat>
      </PriceStatsContainer>
    )
  return (
    <PriceStatsContainer>
      <StyledStat>
        <StyledStatTitle>NAV</StyledStatTitle>
        <StyledStatMetric>${formatMetric(getNetAssetValue())}</StyledStatMetric>
      </StyledStat>
      <StyledStat>
        <StyledStatTitle>{divergenceLabel}</StyledStatTitle>
        <StyledStatMetric color={divergenceLabelColor}>
          {formatDivergenceMetric(netAssetValueDivergence)}%
        </StyledStatMetric>
      </StyledStat>
    </PriceStatsContainer>
  )
}

const PriceStatsContainer = styled.div`
  display: flex;
  width: 65%;
  align-items: flex-end;
  justify-content: flex-end;
  padding-right: 5px;
  @media (max-width: 767px) {
    flex-direction: column;
    width: 100%;
  }
`
const StyledStat = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 15px;
  align-items: flex-end;
`
const StyledStatTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  @media (max-width: 767px) {
    font-size: 22px;
  }
`
const StyledStatMetric = styled.div`
  font-size: 18px;
  @media (max-width: 767px) {
    font-size: 20px;
    padding-bottom: 10px;
  }
  color: ${({ color }) => color};
`

export default ProductMetaData

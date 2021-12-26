import React from 'react'

import { InputProps } from 'react-neu'

import numeral from 'numeral'
import styled from 'styled-components'

import {
  Bitcoin2xFlexibleLeverageIndex,
  Ethereum2xFlexibleLeverageIndex,
} from 'constants/productTokens'
import { SetComponent } from 'contexts/SetComponents/SetComponent'
import BigNumber from 'utils/bignumber'

import { TokenDataProps } from './ProductDataUI'

interface ProductMetaDataProps extends InputProps {
  tokenData: TokenDataProps
}

export const calcNetAssetValueDivergence = ({
  price,
  nav,
}: {
  price: number
  nav: number
}): number => {
  if (price <= 0 || nav <= 0) return 0
  return ((price - nav) * 100) / nav
}

const ProductMetaData: React.FC<ProductMetaDataProps> = ({ tokenData }) => {
  const formatMetric = (metricValue: number) =>
    numeral(metricValue).format('0.00a').toString().toUpperCase()
  const formatLeverageMetric = (metricValue: number) =>
    numeral(metricValue).format('0.00').toString().toUpperCase()
  const formatDivergenceMetric = (metricValue: number) =>
    numeral(Math.abs(metricValue)).format('0.00').toString().toUpperCase()
  const formatCurrentSupply = (currentSupply: BigNumber | undefined) =>
    currentSupply ? numeral(currentSupply || '0').format('0,0') : '--'

  const isFLI =
    tokenData.token.symbol === Ethereum2xFlexibleLeverageIndex.symbol ||
    tokenData.token.symbol === Bitcoin2xFlexibleLeverageIndex.symbol

  const realLeverage =
    tokenData.components && tokenData.components.length > 0
      ? Number(tokenData.components[0].percentOfSet || 0) / 100
      : 2

  const netAssetValueReducer = (
    netAssetValue: number,
    component: SetComponent
  ): number => {
    return netAssetValue + (parseFloat(component.totalPriceUsd) || 0)
  }

  const getNetAssetValue = () => {
    return tokenData.components
      ? tokenData.components.reduce(netAssetValueReducer, 0)
      : 0
  }

  const netAssetValueDivergence = calcNetAssetValueDivergence({
    nav: getNetAssetValue(),
    price: tokenData.latestPrice ?? 0,
  })

  const divergenceLabel = netAssetValueDivergence > 1 ? 'Premium' : 'Discount'
  const divergenceLabelColor = netAssetValueDivergence > 1 ? 'red' : 'green'

  if (isFLI)
    return (
      <PriceStatsContainer>
        <StyledStat>
          <StyledStatTitle data-cy='real-leverage-label'>
            Real Leverage
          </StyledStatTitle>
          <StyledStatMetric data-cy='real-leverage-value'>
            {formatLeverageMetric(realLeverage)}x
          </StyledStatMetric>
        </StyledStat>
        <StyledStat>
          <StyledStatTitle data-cy='target-leverage-label'>
            Target Leverage
          </StyledStatTitle>
          <StyledStatMetric data-cy='target-leverage-value'>
            2x
          </StyledStatMetric>
        </StyledStat>
        <StyledStat>
          <StyledStatTitle data-cy='current-supply-label'>
            Current Supply
          </StyledStatTitle>
          <StyledStatMetric data-cy='current-supply-value'>
            {formatCurrentSupply(tokenData.currentSupply)}
          </StyledStatMetric>
        </StyledStat>
        <StyledStat>
          <StyledStatTitle data-cy='net-asset-value-label'>
            Net Asset Value
          </StyledStatTitle>
          <StyledStatMetric data-cy='net-asset-value-value'>
            ${formatMetric(getNetAssetValue())}
          </StyledStatMetric>
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
        <StyledStatTitle data-cy='market-cap-label'>Market Cap</StyledStatTitle>
        <StyledStatMetric data-cy='market-cap-value'>
          ${formatMetric(tokenData.latestMarketCap || 0)}
        </StyledStatMetric>
      </StyledStat>
      <StyledStat>
        <StyledStatTitle data-cy='net-asset-value-label'>
          Net Asset Value
        </StyledStatTitle>
        <StyledStatMetric data-cy='net-asset-value-value'>
          ${formatMetric(getNetAssetValue())}
        </StyledStatMetric>
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
  padding-top: 10px;
  @media (max-width: 767px) {
    flex-direction: column;
    width: 100%;
  }
`
const StyledStat = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 481px) {
    padding-right: 15px;
  }
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

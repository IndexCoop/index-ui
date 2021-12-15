import React from 'react'

import numeral from 'numeral'
import styled from 'styled-components'

import BigNumber from 'utils/bignumber'

import { ProductPageSection } from './ProductPageLayouts'

interface ProductTokenStatsProps {
  latestMarketCap?: number
  latestVolume?: number
  fees?: {
    streamingFee: string
  }
  netAssetValue: number
  /**
   * The total supply cap of this product. If no supply cap is provided, supply
   * cap is not displayed.
   */
  supplyCap: BigNumber | undefined
  currentSupply: BigNumber | undefined
}

const ProductTokenStats: React.FC<ProductTokenStatsProps> = ({
  latestMarketCap,
  latestVolume,
  fees,
  supplyCap,
  currentSupply,
  netAssetValue,
}) => {
  const formatMetric = (metricValue: number) =>
    numeral(metricValue).format('0.00a').toString().toUpperCase()

  const formattedSupplyCap = () =>
    supplyCap ? numeral(supplyCap?.toString() || '0').format('0,0') : '--'

  const formattedMarketCap = () => {
    if (latestMarketCap) {
      return '$' + formatMetric(latestMarketCap)
    } else if (currentSupply) {
      const approxMarketCap = Number(currentSupply) * netAssetValue
      return '$' + formatMetric(approxMarketCap)
    } else {
      return '--'
    }
  }

  const streamingFee = fees?.streamingFee && (
    <StyledStat>
      <StyledStatTitle>Streaming Fee</StyledStatTitle>
      <StyledStatMetric>{fees?.streamingFee}</StyledStatMetric>
    </StyledStat>
  )

  const supplyCapStat = supplyCap && (
    <StyledStat>
      <StyledStatTitle>Supply Cap</StyledStatTitle>
      <StyledStatMetric>{formattedSupplyCap()}</StyledStatMetric>
    </StyledStat>
  )

  const formattedCurrentSupply = currentSupply
    ? numeral(currentSupply?.toString() || '0').format('0,0')
    : '--'

  return (
    <ProductPageSection title='Stats'>
      <PriceStatsContainer>
        <StyledStat>
          <StyledStatTitle>Market Cap</StyledStatTitle>
          <StyledStatMetric>{formattedMarketCap()}</StyledStatMetric>
        </StyledStat>
        <StyledStat>
          <StyledStatTitle>Volume</StyledStatTitle>
          <StyledStatMetric>
            ${formatMetric(latestVolume || 0)}
          </StyledStatMetric>
        </StyledStat>
        <StyledStat>
          <StyledStatTitle>Current Supply</StyledStatTitle>
          <StyledStatMetric>{formattedCurrentSupply}</StyledStatMetric>
        </StyledStat>
        {supplyCapStat}
        {streamingFee}
      </PriceStatsContainer>
    </ProductPageSection>
  )
}

const PriceStatsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`
const StyledStat = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 481px) {
    flex: 1;
  }
  @media (max-width: 480px) {
    align-items: center;
  }
`
const StyledStatTitle = styled.div`
  font-size: 16px;
  @media (max-width: 480px) {
    font-size: 14px;
  }
`
const StyledStatMetric = styled.div`
  font-size: 24px;
  @media (max-width: 480px) {
    font-size: 16px;
  }
`

export default ProductTokenStats

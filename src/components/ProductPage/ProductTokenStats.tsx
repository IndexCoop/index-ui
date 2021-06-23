import React from 'react'
import styled from 'styled-components'
import numeral from 'numeral'

import { ProductPageSection } from './ProductPageLayouts'
import BigNumber from 'utils/bignumber'

interface ProductTokenStatsProps {
  latestMarketCap?: number
  latestVolume?: number
  fees?: {
    streamingFee: string
  }
  netAssetValue: number
  supplyCap: string | number | undefined
  currentSupply: BigNumber | undefined
}

const ProductTokenStats: React.FC<ProductTokenStatsProps> = ({
  latestMarketCap,
  latestVolume,
  fees,
  supplyCap,
  currentSupply,
}) => {
  const formatMetric = (metricValue: number) =>
    numeral(metricValue).format('0.00a').toString().toUpperCase()
  const formattedSupplyCap = () =>
    numeral(supplyCap).format('0,0').toString().toUpperCase()

  const streamingFee = fees?.streamingFee && (
    <StyledStat>
      <StyledStatTitle>Streaming Fee</StyledStatTitle>
      <StyledStatMetric>{fees?.streamingFee}</StyledStatMetric>
    </StyledStat>
  )

  const supplyCapStat = supplyCap != undefined && (
    <StyledStat>
      <StyledStatTitle>Supply Cap</StyledStatTitle>
      <StyledStatMetric>{formattedSupplyCap()}</StyledStatMetric>
    </StyledStat>
  )

  return (
    <ProductPageSection title='Stats'>
      <PriceStatsContainer>
        <StyledStat>
          <StyledStatTitle>Market Cap</StyledStatTitle>
          <StyledStatMetric>
            ${formatMetric(latestMarketCap || 0)}
          </StyledStatMetric>
        </StyledStat>
        <StyledStat>
          <StyledStatTitle>Volume</StyledStatTitle>
          <StyledStatMetric>
            ${formatMetric(latestVolume || 0)}
          </StyledStatMetric>
        </StyledStat>
        <StyledStat>
          <StyledStatTitle>Current Supply</StyledStatTitle>
          <StyledStatMetric>
            {numeral(currentSupply?.toString() || '0').format('0,0')}
          </StyledStatMetric>
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

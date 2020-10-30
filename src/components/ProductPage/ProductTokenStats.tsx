import React from 'react'
import styled from 'styled-components'
import numeral from 'numeral'

import { ProductPageSection } from './ProductPageLayouts'

interface ProductTokenStatsProps {
  latestPrice?: number
  latestMarketCap?: number
  latestVolume?: number
}

const ProductTokenStats: React.FC<ProductTokenStatsProps> = ({
  latestPrice,
  latestMarketCap,
  latestVolume,
}) => {
  const formatMetric = (metricValue: number) =>
    numeral(metricValue).format('0.00a').toString().toUpperCase()
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
            {numeral((latestMarketCap || 0) / (latestPrice || 1)).format('0,0')}
          </StyledStatMetric>
        </StyledStat>
      </PriceStatsContainer>
    </ProductPageSection>
  )
}

const PriceStatsContainer = styled.div`
  display: flex;
`
const StyledStat = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`
const StyledStatTitle = styled.div`
  font-size: 16px;
`
const StyledStatMetric = styled.div`
  font-size: 24px;
`

export default ProductTokenStats

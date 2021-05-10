import React from 'react'
import styled from 'styled-components'
import numeral from 'numeral'

import { ProductPageSection } from './ProductPageLayouts'
import IndexComponent from 'components/IndexComponent'

interface ProductTokenStatsProps {
  latestPrice?: number
  latestMarketCap?: number
  latestVolume?: number
  fees?: {
    streamingFee: string
  }
  nav: number
}

const ProductTokenStats: React.FC<ProductTokenStatsProps> = ({
  latestPrice,
  latestMarketCap,
  latestVolume,
  fees,
  nav,
}) => {
  const formatMetric = (metricValue: number) =>
    numeral(metricValue).format('0.00a').toString().toUpperCase()

  const streamingFee = fees?.streamingFee && (
    <StyledStat>
      <StyledStatTitle>Streaming Fee</StyledStatTitle>
      <StyledStatMetric>{fees?.streamingFee}</StyledStatMetric>
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
            {numeral((latestMarketCap || 0) / (latestPrice || 1)).format('0,0')}
          </StyledStatMetric>
        </StyledStat>
        {streamingFee}
        <StyledStat>
          <StyledStatTitle>NAV</StyledStatTitle>
          <StyledStatMetric>{numeral(nav).format('$0,0.00')}</StyledStatMetric>
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

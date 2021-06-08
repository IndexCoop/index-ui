import React from 'react'
import styled from 'styled-components'
import numeral from 'numeral'

interface ProductTokenStatsProps {
  latestPrice?: number
  latestMarketCap?: number
  latestVolume?: number
  fees?: {
    streamingFee: string
  }
  netAssetValue: number
}

const ProductTokenStats: React.FC<ProductTokenStatsProps> = ({
  latestPrice,
  latestMarketCap,
  latestVolume,
  fees,
  netAssetValue,
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
    <PriceStatsContainer>
      <StyledStat>
        <StyledStatTitle>Market Cap</StyledStatTitle>
        <StyledStatMetric>
          ${formatMetric(latestMarketCap || 0)}
        </StyledStatMetric>
      </StyledStat>
      <StyledStat>
        <StyledStatTitle>Volume</StyledStatTitle>
        <StyledStatMetric>${formatMetric(latestVolume || 0)}</StyledStatMetric>
      </StyledStat>
      <StyledStat>
        <StyledStatTitle>Current Supply</StyledStatTitle>
        <StyledStatMetric>
          {numeral((latestMarketCap || 0) / (latestPrice || 1)).format('0,0')}
        </StyledStatMetric>
      </StyledStat>
      {streamingFee}
      <StyledStat>
        <StyledStatTitle>Net Asset Value</StyledStatTitle>
        <StyledStatMetric>
          {numeral(netAssetValue).format('$0,0.00')}
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
  font-size: 14px;
  font-weight: 600;
  @media (max-width: 767px) {
    font-size: 22px;
  }
`
const StyledStatMetric = styled.div`
  font-size: 16px;
  @media (max-width: 767px) {
    font-size: 20px;
    padding-bottom: 10px;
  }
`

export default ProductTokenStats

import React from 'react'
import styled from 'styled-components'
import numeral from 'numeral'

import InfoSection from './InfoSection'

import useDpiTokenMarketData from 'hooks/useDpiTokenMarketData'

const DpiPriceChanges: React.FC = () => {
  const { latestPrice, latestVolume, latestMarketCap } = useDpiTokenMarketData()

  return (
    <InfoSection title='Stats'>
      <PriceStatsContainer>
        <StyledStat>
          <StyledStatTitle>Market Cap</StyledStatTitle>
          <StyledStatMetric>
            ${numeral(latestMarketCap).format('0.00a')}
          </StyledStatMetric>
        </StyledStat>
        <StyledStat>
          <StyledStatTitle>Volume</StyledStatTitle>
          <StyledStatMetric>
            ${numeral(latestVolume).format('0.00a')}
          </StyledStatMetric>
        </StyledStat>
        <StyledStat>
          <StyledStatTitle>Current Supply</StyledStatTitle>
          <StyledStatMetric>
            {numeral((latestMarketCap || 0) / (latestPrice || 1)).format('0,0')}
          </StyledStatMetric>
        </StyledStat>
      </PriceStatsContainer>
    </InfoSection>
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

export default DpiPriceChanges

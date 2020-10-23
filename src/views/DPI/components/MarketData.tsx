import React from 'react'
import styled from 'styled-components'
import numeral from 'numeral'
import { Container, Card, CardContent, Spacer } from 'react-neu'

import FancyValue from 'components/FancyValue'
import Split from 'components/Split'
import SimplePriceChart from 'components/SimplePriceChart'

import useDpiTokenMarketData from 'hooks/useDpiTokenMarketData'

const MarketData: React.FC = () => {
  const {
    latestVolume,
    latestMarketCap,
    latestPrice,
    prices,
  } = useDpiTokenMarketData()
  const priceAtEpochStart = prices?.[0]?.[1] || 1
  const epochPriceChange = (latestPrice || 0) - priceAtEpochStart
  const dpiTokenIcon = {
    src: 'https://index-dao.s3.amazonaws.com/defi_pulse_index_set.svg',
    alt: 'DefiPulse Index Logo',
  }

  return (
    <>
      <Card>
        <CardContent>
          <StyledDpiIconLabel>
            <StyledIcon src={dpiTokenIcon.src} alt={dpiTokenIcon.alt} />
            <span>DPI</span>
          </StyledDpiIconLabel>
          <StyledDpiTitle>DeFi Pulse Index</StyledDpiTitle>
          <StyledDpiPriceWrapper>
            <StyledDpiPrice>
              {'$' + numeral(latestPrice).format('0.00a')}
            </StyledDpiPrice>
            <StyledDpiPriceChange>
              {numeral((epochPriceChange / priceAtEpochStart) * 100).format(
                '0.00a'
              ) + '%'}
            </StyledDpiPriceChange>
          </StyledDpiPriceWrapper>
        </CardContent>
        <SimplePriceChart
          icon={dpiTokenIcon}
          data={prices?.map(([x, y]) => ({ x, y }))}
        />
      </Card>
    </>
  )
}

const StyledDpiTitle = styled.div`
  font-size: 32px;
  font-weight: 600;
`

const StyledDpiIconLabel = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const StyledDpiPriceWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 10px;
`

const StyledDpiPrice = styled.span`
  font-size: 36px;
  margin-right: 10px;
  line-height: 1;
`

const StyledDpiPriceChange = styled.span`
  font-size: 24px;
  color: #03c75e;
`

const StyledIcon = styled.img`
  height: 34px;
  text-align: center;
  min-width: 34px;
  margin-right: 5px;
`

export default MarketData

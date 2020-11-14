import React from 'react'
import styled from 'styled-components'
import numeral from 'numeral'
import { NavLink } from 'react-router-dom'
import { Card, CardContent, Spacer } from 'react-neu'

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
      <StyledMarketDataTitle>Products</StyledMarketDataTitle>
      <Card>
        <CardContent>
          <StyledDpiSplitHeader>
            <div>
              <StyledDpiIconLabel>
                <StyledIcon src={dpiTokenIcon.src} alt={dpiTokenIcon.alt} />
                <span>DPI</span>
              </StyledDpiIconLabel>
              <StyledDpiTitle>DeFi Pulse Index</StyledDpiTitle>
            </div>
            <StyledViewMoreButton to='/dpi'>
              View the DeFi Pulse Index ➔
            </StyledViewMoreButton>
          </StyledDpiSplitHeader>
        </CardContent>
        <SimplePriceChart
          showTooltip
          icon={dpiTokenIcon}
          data={prices?.map(([x, y]) => ({ x, y }))}
        />
      </Card>

      <Spacer />

      <Split>
        <Card>
          <CardContent>
            <FancyValue
              icon={dpiTokenIcon}
              label='Current $DPI Price'
              value={'$' + numeral(latestPrice).format('0.00a')}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <FancyValue
              icon={dpiTokenIcon}
              label='1 Month Price Change'
              value={
                numeral((epochPriceChange / priceAtEpochStart) * 100).format(
                  '0.00a'
                ) + '%'
              }
            />
          </CardContent>
        </Card>
      </Split>

      <Spacer />

      <Split>
        <Card>
          <CardContent>
            <FancyValue
              icon={dpiTokenIcon}
              label='$DPI 24hr Volume'
              value={'$' + numeral(latestVolume).format('0.00a')}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <FancyValue
              icon={dpiTokenIcon}
              label='$DPI Marketcap'
              value={'$' + numeral(latestMarketCap).format('0.00a')}
            />
          </CardContent>
        </Card>
      </Split>
      <Spacer size='lg' />
    </>
  )
}

const StyledMarketDataTitle = styled.h2`
  font-size: 32px;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary.grey};
  padding-bottom: 30px;
  margin-bottom: 30px;
`

const StyledDpiSplitHeader = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`

const StyledDpiTitle = styled.div`
  font-size: 32px;
  font-weight: 600;
`

const StyledDpiIconLabel = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const StyledViewMoreButton = styled(NavLink)`
  height: 24px;
  color: ${(props) => props.theme.colors.grey[500]};
  cursor: pointer;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.grey[600]};
  }
`

const StyledIcon = styled.img`
  height: 34px;
  text-align: center;
  min-width: 34px;
  margin-right: 5px;
`

export default MarketData

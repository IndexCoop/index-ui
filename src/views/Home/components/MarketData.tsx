import React, { useState } from 'react'
import styled from 'styled-components'
import numeral from 'numeral'
import { NavLink } from 'react-router-dom'
import { Button, Card, CardContent, Spacer } from 'react-neu'

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
    hourlyPrices,
  } = useDpiTokenMarketData()
  const priceAtEpochStart = prices?.[0]?.[1] || 1
  const epochPriceChange = (latestPrice || 0) - priceAtEpochStart
  const dpiTokenIcon = {
    src: 'https://index-dao.s3.amazonaws.com/defi_pulse_index_set.svg',
    alt: 'DefiPulse Index Logo',
  }

  const [indexSelector, setIndexSelector] = useState<number>(0)
  const [priceChartData, setPriceChartData] = useState<number[][]>([[1]])
  const [priceChartHourlyData, setPriceChartHourlyData] = useState<number[][]>([
    [1],
  ])

  const handleDpiButton = () => {
    setIndexSelector(0)
    setPriceChartData(prices ? prices : [[1]])
    setPriceChartHourlyData(hourlyPrices ? hourlyPrices : [[1]])
  }

  const handleMviButton = () => {
    setIndexSelector(1)
    setPriceChartData(prices ? prices : [[1]])
    setPriceChartHourlyData(hourlyPrices ? hourlyPrices : [[1]])
  }

  const handleEthFliButton = () => {
    setIndexSelector(2)
    setPriceChartData(prices ? prices : [[1]])
    setPriceChartHourlyData(hourlyPrices ? hourlyPrices : [[1]])
  }

  const handleCGIButton = () => {
    setIndexSelector(3)
    setPriceChartData(prices ? prices : [[1]])
    setPriceChartHourlyData(hourlyPrices ? hourlyPrices : [[1]])
  }

  return (
    <>
      <StyledMarketDataTitle>Products</StyledMarketDataTitle>
      <ButtonWrapper>
        <Button
          full
          size={'sm'}
          text='DPI'
          variant={indexSelector === 0 ? 'default' : 'secondary'}
          onClick={handleDpiButton}
        />
        <Spacer size={'sm'} />
        <Button
          full
          size={'sm'}
          text='MVI'
          variant={indexSelector === 1 ? 'default' : 'secondary'}
          onClick={handleMviButton}
        />
        <Spacer size={'sm'} />
        <Button
          full
          size={'sm'}
          text='ETH2x-FLI'
          variant={indexSelector === 2 ? 'default' : 'secondary'}
          onClick={handleEthFliButton}
        />
        <Spacer size={'sm'} />
        <Button
          full
          size={'sm'}
          text='CGI'
          variant={indexSelector === 3 ? 'default' : 'secondary'}
          onClick={handleCGIButton}
        />
      </ButtonWrapper>
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
          data={priceChartData?.map(([x, y]) => ({ x, y }))}
          hourlyData={priceChartHourlyData?.map(([x, y]) => ({ x, y }))}
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

const ButtonWrapper = styled.div`
  display: flex;
  padding-bottom: 20px;
`

export default MarketData

import React from 'react'

import numeral from 'numeral'
import { Container, Card, CardContent, Spacer } from 'react-neu'

import FancyValue from 'components/FancyValue'
import Split from 'components/Split'
import SimplePriceChart from 'components/SimplePriceChart'

import useDpiTokenMarketData from 'hooks/useDpiTokenMarketData';

const MarketData: React.FC = () => {
  const {
    latestVolume,
    latestMarketCap,
    latestPrice,
    prices
  } = useDpiTokenMarketData()
  const priceAtEpochStart = prices?.[0]?.[1] || 1
  const epochPriceChange = ((latestPrice || 0) - priceAtEpochStart)
  const dpiTokenIcon = {
    src: 'https://index-dao.s3.amazonaws.com/defi_pulse_index_set.svg',
    alt: 'DefiPulse Index Logo',
  }
  return (
    <>
      <Container>
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
                value={numeral((epochPriceChange / priceAtEpochStart) * 100)
                  .format('0.00a') + '%'}
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
      </Container>
      <Spacer />
      <SimplePriceChart
        title='Price of DefiPulse Index'
        icon={dpiTokenIcon}
        data={prices?.map(([x, y]) => ({ x, y }))}
      />
      <Spacer size="lg" />
    </>
  )
}

export default MarketData

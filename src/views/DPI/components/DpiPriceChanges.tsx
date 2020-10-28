import React, { ReactNode } from 'react'
import styled from 'styled-components'
import numeral from 'numeral'

import InfoSection from './InfoSection'

import useDpiTokenMarketData from 'hooks/useDpiTokenMarketData'

const DpiPriceChanges: React.FC = () => {
  const { prices } = useDpiTokenMarketData()
  const [startTime] = prices?.[0] || [0]
  const [latestTime, latestPrice] = prices?.[prices.length - 1] || [0, 0]
  // Coingecko API returns each item as hourly data if < 90 days and daily data > 90 days
  // So if time between start and end time < 90 days, 1 day of data is 24 array items.
  const dataCadenceFor24Hours = latestTime - startTime < 7776000000 ? 24 : 1
  const priceChangeIntervals = [
    ['1 Day', 1],
    ['1 Month', 30],
    ['3 Months', 90],
    ['1 Year', 365],
  ]

  const calculatePriceDiffs = (daysOfComparison: number) => {
    // placeholder if no data available for timerange
    if (!prices || prices.length < daysOfComparison * dataCadenceFor24Hours)
      return <div>---</div>
    const startPriceIndex =
      prices.length - daysOfComparison * dataCadenceFor24Hours
    const startPrice = prices[startPriceIndex][1]
    const priceDiff = ((latestPrice - startPrice) / startPrice) * 100
    const StyledPrice =
      priceDiff < 0 ? StyledNegativePrice : StyledPositivePrice
    return (
      <StyledPrice>{numeral(priceDiff).format('+0.00a') + '%'}</StyledPrice>
    )
  }

  const renderPriceChanges = (config: any) => {
    const [dateString, daysOfComparison] = config // how to destructure in params without tsx bitching?
    return (
      <StyledPriceChange key={daysOfComparison}>
        <StyledDateString>{dateString}</StyledDateString>
        {calculatePriceDiffs(daysOfComparison)}
      </StyledPriceChange>
    )
  }

  return (
    <InfoSection title='Changes'>
      <PriceChangesContainer>
        {priceChangeIntervals.map<ReactNode>(renderPriceChanges)}
      </PriceChangesContainer>
    </InfoSection>
  )
}

const PriceChangesContainer = styled.div`
  display: flex;
`
const StyledPriceChange = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`
const StyledDateString = styled.div`
  font-size: 16px;
  margin-bottom: 16px;
`

const StyledNegativePrice = styled.div`
  color: red;
`

const StyledPositivePrice = styled.div`
  color: green;
`

export default DpiPriceChanges

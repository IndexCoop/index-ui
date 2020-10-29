import React, { ReactNode } from 'react'
import styled from 'styled-components'
import numeral from 'numeral'

import { ProductPageSection } from './ProductPageLayouts'

interface ProductPriceChangesProps {
  prices?: number[][]
}

const ProductPriceChanges: React.FC<ProductPriceChangesProps> = ({
  prices,
}) => {
  const [startTime] = prices?.[0] || [0]
  const [latestTime, latestPrice] = prices?.[prices.length - 1] || [0, 0]
  // Coingecko API returns each item as hourly data if < 90 days and daily data > 90 days
  // So if time between start and end time < 90 days, 1 day of data is 24 array items.
  const ninetyDays = 7776000000
  const dataCadenceFor24Hours = latestTime - startTime < ninetyDays ? 24 : 1
  const priceChangeIntervals = [
    ['1 Day', 1],
    ['1 Month', 30],
    ['3 Months', 90],
    ['1 Year', 365],
  ]

  const renderAssetPriceChange = (daysOfComparison: number) => {
    // placeholder if no data available for timerange
    if (!prices || prices.length < daysOfComparison * dataCadenceFor24Hours) {
      return <div>---</div>
    }
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
    const [dateString, daysOfComparison] = config
    return (
      <StyledPriceChange key={daysOfComparison}>
        <StyledDateString>{dateString}</StyledDateString>
        {renderAssetPriceChange(daysOfComparison)}
      </StyledPriceChange>
    )
  }

  return (
    <ProductPageSection title='Changes'>
      <PriceChangesContainer>
        {priceChangeIntervals.map<ReactNode>(renderPriceChanges)}
      </PriceChangesContainer>
    </ProductPageSection>
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
  color: ${({ theme }) => {
    console.log('theme', theme.colors.red, theme.colors)
    return theme.colors.red
  }};
`

const StyledPositivePrice = styled.div`
  color: ${({ theme }) => theme.colors.green};
`

export default ProductPriceChanges

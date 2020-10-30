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

  const calculatePriceChange = (daysOfComparison: number) => {
    if (!prices || prices.length < daysOfComparison * dataCadenceFor24Hours) {
      return 0
    }
    const startPriceIndex =
      prices.length - daysOfComparison * dataCadenceFor24Hours
    const startPrice = prices[startPriceIndex][1]
    const priceChange = ((latestPrice - startPrice) / startPrice) * 100
    return priceChange
  }

  const renderAssetPriceChange = (priceChange: number) => {
    // placeholder if no data available for timerange
    if (!priceChange) {
      return <div>---</div>
    }
    const formattedChange = numeral(priceChange).format('+0.00a') + '%'
    if (priceChange > 0) {
      return <StyledPositiveChange>{formattedChange}</StyledPositiveChange>
    }
    return <StyledNegativeChange>{formattedChange}</StyledNegativeChange>
  }

  const renderPriceChanges = (config: any) => {
    const [dateString, daysOfComparison] = config
    const priceChange = calculatePriceChange(daysOfComparison)
    return (
      <StyledPriceChange key={daysOfComparison}>
        <StyledDateString>{dateString}</StyledDateString>
        {renderAssetPriceChange(priceChange)}
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

const StyledNegativeChange = styled.div`
  color: ${({ theme }) => theme.colors.red};
`

const StyledPositiveChange = styled.div`
  color: ${({ theme }) => theme.colors.green};
`

export default ProductPriceChanges

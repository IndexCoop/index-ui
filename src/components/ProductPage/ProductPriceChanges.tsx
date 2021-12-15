import React, { ReactNode } from 'react'

import numeral from 'numeral'
import styled from 'styled-components'

import { ProductPageSection } from './ProductPageLayouts'

interface ProductPriceChangesProps {
  prices?: number[][]
  hourlyPrices?: number[][]
}

const ProductPriceChanges: React.FC<ProductPriceChangesProps> = ({
  prices,
  hourlyPrices,
}) => {
  const priceChangeIntervals = [
    ['1 Day', 1],
    ['1 Month', 30],
    ['3 Months', 90],
    ['1 Year', 365],
  ]

  const calculatePriceChange = (daysOfComparison: number) => {
    if (daysOfComparison <= 30) {
      const startPrice = hourlyPrices
        ? hourlyPrices.slice(-24 * daysOfComparison)[0][1]
        : 1
      const hourlyPricesLength = hourlyPrices ? hourlyPrices.length - 1 : 0
      const latestPrice = hourlyPrices ? hourlyPrices[hourlyPricesLength][1] : 1
      return ((latestPrice - startPrice) / startPrice) * 100
    } else if (prices && prices?.length > daysOfComparison) {
      const startPrice = prices[prices.length - daysOfComparison][1]
      const latestPrice = prices[prices.length - 1][1]
      return ((latestPrice - startPrice) / startPrice) * 100
    }
    return 0
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

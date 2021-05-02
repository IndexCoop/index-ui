import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import numeral from 'numeral'

import SimplePriceChart from 'components/SimplePriceChart'

import { PriceChartRangeOption } from 'constants/priceChartEnums'
import { InputProps } from 'react-neu'

interface MarketDataInputProps extends InputProps {
  latestPrice: number
  prices: number[][]
  hourlyPrices: number[][]
  tokenIcon: { src: string; alt: string }
  title: string
  tokenSymbol: string
}

const MarketData: React.FC<MarketDataInputProps> = ({
  latestPrice,
  prices,
  hourlyPrices,
  tokenIcon,
  title,
  tokenSymbol,
}) => {
  const [chartPrice, setChartPrice] = useState<number>(0)
  const [chartDate, setChartDate] = useState<number>(Date.now())
  const [chartRange, setChartRange] = useState<number>(
    PriceChartRangeOption.MONTHLY_PRICE_RANGE
  ) //default 30 since default chart is 1M
  const [dateString, setDateString] = useState<String>('')

  useEffect(() => {
    if (latestPrice) setChartPrice(latestPrice)
  }, [latestPrice])

  const priceAtEpochStart = prices?.slice(-chartRange)[0]?.[1] || 1
  const hourlyPriceAtEpochStart = hourlyPrices?.slice(-24)[0]?.[1] || 1
  const startingPrice =
    chartRange > PriceChartRangeOption.DAILY_PRICE_RANGE
      ? priceAtEpochStart
      : hourlyPriceAtEpochStart
  const epochPriceChange = (chartPrice || 0) - startingPrice

  const updateChartPrice = (chartData: any) => {
    const payload = chartData?.activePayload?.[0]?.payload || {}

    setTimeout(() => {
      setChartPrice(payload.y || 0)
      setChartDate(payload.x || Date.now())

      if (chartRange === PriceChartRangeOption.DAILY_PRICE_RANGE) {
        setDateString(
          priceData.toLocaleTimeString([], {
            hour: 'numeric',
            minute: 'numeric',
          })
        )
      } else {
        setDateString(priceData.toDateString())
      }
    }, 0)
  }

  const resetChartPrice = () => {
    setTimeout(() => {
      setChartPrice(latestPrice || 0)
      setChartDate(Date.now())

      if (chartRange === PriceChartRangeOption.DAILY_PRICE_RANGE) {
        setDateString(
          priceData.toLocaleTimeString([], {
            hour: 'numeric',
            minute: 'numeric',
          })
        )
      } else {
        setDateString(priceData.toDateString())
      }
    }, 0)
  }

  const priceData = new Date(chartDate)

  return (
    <div>
      <StyledIconLabel>
        <StyledIcon src={tokenIcon.src} alt={tokenIcon.alt} />
        <span>{tokenSymbol}</span>
      </StyledIconLabel>
      <StyledTitle>{title}</StyledTitle>
      <p>{dateString}</p>
      <StyledPriceWrapper>
        <StyledPrice>{'$' + numeral(chartPrice).format('0.00a')}</StyledPrice>
        <StyledPriceChange isLoss={epochPriceChange < 0}>
          {numeral((epochPriceChange / startingPrice) * 100).format('0.00a') +
            '%'}
        </StyledPriceChange>
      </StyledPriceWrapper>
      <SimplePriceChart
        icon={tokenIcon}
        data={prices?.map(([x, y]) => ({ x, y }))}
        hourlyData={hourlyPrices?.map(([x, y]) => ({ x, y }))}
        onMouseMove={updateChartPrice}
        onMouseLeave={resetChartPrice}
        setChartRange={setChartRange}
      />
    </div>
  )
}

const StyledTitle = styled.div`
  font-size: 32px;
  font-weight: 600;
`

const StyledIconLabel = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const StyledPriceWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 10px;
`

const StyledPrice = styled.span`
  font-size: 36px;
  margin-right: 10px;
  line-height: 1;
`

const StyledPriceChange = styled.span`
  font-size: 24px;
  color: ${(props: { isLoss: boolean }) =>
    props.isLoss ? '#ff4a4a' : '#03c75e'};
`

const StyledIcon = styled.img`
  height: 34px;
  text-align: center;
  min-width: 34px;
  margin-right: 5px;
`

export default MarketData

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import numeral from 'numeral'

import SimplePriceChart from 'components/SimplePriceChart'

import useMviTokenMarketData from 'hooks/useMviTokenMarketData'

const MarketData: React.FC = () => {
  const { latestPrice, prices, hourlyPrices } = useMviTokenMarketData()
  const [chartPrice, setChartPrice] = useState<number>(0)
  const [chartDate, setChartDate] = useState<number>(Date.now())
  const [chartRange, setChartRange] = useState<number>(30) //default 30 since default chart is 1M
  const [dateString, setDateString] = useState<String>('')

  useEffect(() => {
    if (latestPrice) setChartPrice(latestPrice)
  }, [latestPrice])

  const priceAtEpochStart = prices?.slice(-chartRange)[0]?.[1] || 1
  const hourlyPriceAtEpochStart = hourlyPrices?.slice(-24)[0]?.[1] || 1
  const startingPrice =
    chartRange > 1 ? priceAtEpochStart : hourlyPriceAtEpochStart
  const epochPriceChange = (chartPrice || 0) - startingPrice
  const mviTokenIcon = {
    src: 'https://set-core.s3.amazonaws.com/img/portfolios/mvi.svg',
    alt: 'MVI Logo',
  }

  const updateChartPrice = (chartData: any) => {
    const payload = chartData?.activePayload?.[0]?.payload || {}

    setTimeout(() => {
      setChartPrice(payload.y || 0)
      setChartDate(payload.x || Date.now())

      if (chartRange === 1) {
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

      if (chartRange === 1) {
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
      <StyledMviIconLabel>
        <StyledIcon src={mviTokenIcon.src} alt={mviTokenIcon.alt} />
        <span>MVI</span>
      </StyledMviIconLabel>
      <StyledMviTitle>Metaverse Index</StyledMviTitle>
      <p>{dateString}</p>
      <StyledMviPriceWrapper>
        <StyledMviPrice>
          {'$' + numeral(chartPrice).format('0.00a')}
        </StyledMviPrice>
        <StyledMviPriceChange isLoss={epochPriceChange < 0}>
          {numeral((epochPriceChange / startingPrice) * 100).format('0.00a') +
            '%'}
        </StyledMviPriceChange>
      </StyledMviPriceWrapper>
      <SimplePriceChart
        icon={mviTokenIcon}
        data={prices?.map(([x, y]) => ({ x, y }))}
        hourlyData={hourlyPrices?.map(([x, y]) => ({ x, y }))}
        onMouseMove={updateChartPrice}
        onMouseLeave={resetChartPrice}
        setChartRange={setChartRange}
      />
    </div>
  )
}

const StyledMviTitle = styled.div`
  font-size: 32px;
  font-weight: 600;
`

const StyledMviIconLabel = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const StyledMviPriceWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 10px;
`

const StyledMviPrice = styled.span`
  font-size: 36px;
  margin-right: 10px;
  line-height: 1;
`

const StyledMviPriceChange = styled.span`
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

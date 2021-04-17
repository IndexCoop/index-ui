import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import numeral from 'numeral'

import SimplePriceChart from 'components/SimplePriceChart'

import useIndexTokenMarketData from 'hooks/useIndexTokenMarketData'

const MarketData: React.FC = () => {
  const { latestPrice, prices, hourlyPrices } = useIndexTokenMarketData()
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
  const IndexToken = {
    src: 'https://index-dao.s3.amazonaws.com/owl.png',
    alt: 'Index Coop Logo',
  }

  const updateChartPrice = (chartData: any) => {
    const payload = chartData?.activePayload?.[0]?.payload || {}

    setTimeout(() => {
      setChartPrice(payload.y || 0)
      setChartDate(payload.x || Date.now())
    }, 0)

    if (chartRange === 1) {
      setDateString(
        priceData.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })
      )
    } else {
      setDateString(priceData.toDateString())
    }
  }

  const resetChartPrice = () => {
    setTimeout(() => {
      setChartPrice(latestPrice || 0)
      setChartDate(Date.now())
    }, 0)

    if (chartRange === 1) {
      setDateString(
        priceData.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })
      )
    } else {
      setDateString(priceData.toDateString())
    }
  }

  const priceData = new Date(chartDate)

  return (
    <div>
      <StyledDpiIconLabel>
        <StyledIcon src={IndexToken.src} alt={IndexToken.alt} />
        <span>INDEX</span>
      </StyledDpiIconLabel>
      <StyledDpiTitle>Index Coop Token</StyledDpiTitle>
      <p>{dateString}</p>
      <StyledDpiPriceWrapper>
        <StyledDpiPrice>
          {'$' + numeral(chartPrice).format('0.00a')}
        </StyledDpiPrice>
        <StyledDpiPriceChange isLoss={epochPriceChange < 0}>
          {numeral((epochPriceChange / startingPrice) * 100).format('0.00a') +
            '%'}
        </StyledDpiPriceChange>
      </StyledDpiPriceWrapper>
      <SimplePriceChart
        icon={IndexToken}
        data={prices?.map(([x, y]) => ({ x, y }))}
        hourlyData={hourlyPrices?.map(([x, y]) => ({ x, y }))}
        onMouseMove={updateChartPrice}
        onMouseLeave={resetChartPrice}
        setChartRange={setChartRange}
      />
    </div>
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

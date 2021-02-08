import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import numeral from 'numeral'

import SimplePriceChart from 'components/SimplePriceChart'

import useCgiTokenMarketData from 'hooks/useCgiTokenMarketData'

const MarketData: React.FC = () => {
  const { latestPrice, prices } = useCgiTokenMarketData()
  const [chartPrice, setChartPrice] = useState<number>(0)
  const [chartDate, setChartDate] = useState<number>(Date.now())
  const [isDaily, setIsDaily] = useState<Boolean>(false)
  const [dateString, setDateString] = useState<String>('')

  useEffect(() => {
    if (latestPrice) setChartPrice(latestPrice)
  }, [latestPrice])

  const priceAtEpochStart = prices?.[0]?.[1] || 1
  const epochPriceChange = (chartPrice || 0) - priceAtEpochStart
  const cgiTokenIcon = {
    src: 'https://set-core.s3.amazonaws.com/img/portfolios/coinshares_gold.png',
    alt: 'CGI Logo',
  }

  const updateChartPrice = (chartData: any) => {
    const payload = chartData?.activePayload?.[0]?.payload || {}

    setTimeout(() => {
      setChartPrice(payload.y || 0)
      setChartDate(payload.x || Date.now())

      if (isDaily) {
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

      if (isDaily) {
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
      <StyledCgiIconLabel>
        <StyledIcon src={cgiTokenIcon.src} alt={cgiTokenIcon.alt} />
        <span>CGI</span>
      </StyledCgiIconLabel>
      <StyledCgiTitle>CoinShares Crypto Gold Index</StyledCgiTitle>
      <p>{dateString}</p>
      <StyledCgiPriceWrapper>
        <StyledCgiPrice>
          {'$' + numeral(chartPrice).format('0.00a')}
        </StyledCgiPrice>
        <StyledCgiPriceChange isLoss={epochPriceChange < 0}>
          {numeral((epochPriceChange / priceAtEpochStart) * 100).format(
            '0.00a'
          ) + '%'}
        </StyledCgiPriceChange>
      </StyledCgiPriceWrapper>
      <SimplePriceChart
        icon={cgiTokenIcon}
        data={prices?.map(([x, y]) => ({ x, y }))}
        onMouseMove={updateChartPrice}
        onMouseLeave={resetChartPrice}
        setIsDaily={setIsDaily}
      />
    </div>
  )
}

const StyledCgiTitle = styled.div`
  font-size: 32px;
  font-weight: 600;
`

const StyledCgiIconLabel = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const StyledCgiPriceWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 10px;
`

const StyledCgiPrice = styled.span`
  font-size: 36px;
  margin-right: 10px;
  line-height: 1;
`

const StyledCgiPriceChange = styled.span`
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

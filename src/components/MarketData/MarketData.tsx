import React, { useEffect,useState } from 'react'

import { InputProps } from 'react-neu'

import numeral from 'numeral'
import styled from 'styled-components'

import { MetaData } from 'components/ProductPage'
import { TokenDataProps } from 'components/ProductPage/ProductDataUI'
import SimplePriceChart from 'components/SimplePriceChart'
import { PriceChartRangeOption } from 'constants/priceChartEnums'
import { IndexToken } from 'constants/productTokens'

interface MarketDataProps extends InputProps {
  tokenData: TokenDataProps
}

const MarketData: React.FC<MarketDataProps> = ({ tokenData }) => {
  const [chartPrice, setChartPrice] = useState<number>(0)
  const [chartDate, setChartDate] = useState<number>(Date.now())
  const [chartRange, setChartRange] = useState<number>(
    PriceChartRangeOption.MONTHLY_PRICE_RANGE
  ) //default 30 since default chart is 1M
  const [dateString, setDateString] = useState<String>(
    new Date(Date.now()).toDateString()
  )

  useEffect(() => {
    if (tokenData.latestPrice) setChartPrice(tokenData.latestPrice || 0)
  }, [tokenData])

  const priceAtEpochStart = tokenData.prices?.slice(-chartRange)[0]?.[1] || 1
  const hourlyPriceAtEpochStart =
    tokenData.hourlyPrices?.slice(-24)[0]?.[1] || 1
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
          priceDate.toLocaleTimeString([], {
            hour: 'numeric',
            minute: 'numeric',
          })
        )
      } else {
        setDateString(priceDate.toDateString())
      }
    }, 0)
  }

  const resetChartPrice = () => {
    setTimeout(() => {
      setChartPrice(tokenData.latestPrice || 0)
      setChartDate(Date.now())

      if (chartRange === PriceChartRangeOption.DAILY_PRICE_RANGE) {
        setDateString(
          priceDate.toLocaleTimeString([], {
            hour: 'numeric',
            minute: 'numeric',
          })
        )
      } else {
        setDateString(priceDate.toDateString())
      }
    }, 0)
  }

  const priceDate = new Date(chartDate)

  return (
    <div>
      <StyledIconLabel>
        <StyledIcon
          src={tokenData.token.image}
          alt={tokenData.token.symbol + ' Logo'}
        />
        <span data-cy='token-symbol'>{tokenData.token.symbol}</span>
      </StyledIconLabel>
      <StyledTitle data-cy='token-name'>{tokenData.token.name}</StyledTitle>
      {tokenData.token.symbol !== IndexToken.symbol && (
        <MetaData tokenData={tokenData} />
      )}
      <p>{dateString}</p>
      <StyledPriceWrapper>
        <StyledPrice>{'$' + numeral(chartPrice).format('0.00a')}</StyledPrice>
        <StyledPriceChange isLoss={epochPriceChange < 0}>
          {numeral((epochPriceChange / startingPrice) * 100).format('0.00a') +
            '%'}
        </StyledPriceChange>
      </StyledPriceWrapper>
      <SimplePriceChart
        icon={{
          src: tokenData.token.image,
          alt: tokenData.token.symbol + ' Logo',
        }}
        data={tokenData.prices?.map(([x, y]) => ({ x, y }))}
        hourlyData={tokenData.hourlyPrices?.map(([x, y]) => ({ x, y }))}
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
  margin: 10px 0 10px 0;
  @media (max-width: 767px) {
    flex-direction: column;
  }
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

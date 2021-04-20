import React, { useEffect, useState } from 'react'
import { Container, useTheme, Button, Spacer } from 'react-neu'
import numeral from 'numeral'
import styled from 'styled-components'

import FancyValue from 'components/FancyValue'
import { ResponsiveContainer, LineChart, Line, YAxis, Tooltip } from 'recharts'
// docs - http://recharts.org/en-US/guide/

interface SimplePriceChartProps {
  title?: string
  showTooltip?: boolean
  showDurations?: boolean
  icon: {
    src: string
    alt: string
  }
  data?: {
    x: string | number
    y: number
  }[]
  hourlyData?: {
    x: string | number
    y: number
  }[]
  onMouseMove?: (...args: any[]) => any
  onMouseLeave?: (...args: any[]) => any
  setChartRange?: (...args: any[]) => any
}

const MarketDataChart: React.FC<SimplePriceChartProps> = ({
  title,
  showTooltip,
  icon,
  data,
  hourlyData,
  onMouseMove = () => {},
  onMouseLeave = () => {},
  setChartRange = () => {},
}) => {
  const theme = useTheme()
  const formatFloats = (n: number) => parseFloat(numeral(n).format('0.00a'))
  const formatToolTip = (chartData: any) => {
    if (!chartData) return ['--', 'No Data Available']
    const {
      payload: { x, y },
    } = chartData
    let timeString = new Date(x).toLocaleDateString()
    if (durationSelector === Durations.DAILY) {
      timeString = new Date(x).toLocaleTimeString([], {
        hour: 'numeric',
        minute: 'numeric',
      })
    }
    return [timeString, '$' + formatFloats(y)]
  }

  const [durationSelector, setDurationSelector] = useState<number>(2)
  const [price, setPrice] = useState(data)

  enum Durations {
    DAILY = 0,
    WEEKLY = 1,
    MONTHLY = 2,
  }

  enum PriceChartRangeOption {
    DAILY_PRICE_RANGE = 1,
    WEEKLY_PRICE_RANGE = 7,
    MONTHLY_PRICE_RANGE = 30,
  }

  useEffect(() => {
    setTimeout(() => {
      const hourlyDataInterval = 24
      if (durationSelector === Durations.DAILY) {
        setPrice(
          hourlyData?.slice(
            -PriceChartRangeOption.DAILY_PRICE_RANGE * hourlyDataInterval
          )
        ) //last day, hourly
      } else if (durationSelector === Durations.WEEKLY) {
        setPrice(
          hourlyData?.slice(
            -PriceChartRangeOption.WEEKLY_PRICE_RANGE * hourlyDataInterval
          )
        ) //last 7 days, hourly
      } else if (durationSelector === Durations.MONTHLY) {
        setPrice(
          hourlyData?.slice(
            -PriceChartRangeOption.MONTHLY_PRICE_RANGE * hourlyDataInterval
          )
        ) //last 30 days, hourly
      }
    }, 0)
  }, [durationSelector, data, hourlyData])

  const handleDailyButton = () => {
    setDurationSelector(Durations.DAILY)
    setChartRange(PriceChartRangeOption.DAILY_PRICE_RANGE)
  }
  const handleWeeklyButton = () => {
    setDurationSelector(Durations.WEEKLY)
    setChartRange(PriceChartRangeOption.WEEKLY_PRICE_RANGE)
  }
  const handleMonthlyButton = () => {
    setDurationSelector(Durations.MONTHLY)
    setChartRange(PriceChartRangeOption.MONTHLY_PRICE_RANGE)
  }

  const renderTooltip = (props: any) => {
    if (!showTooltip) return null

    const tooltipData = props.payload?.[0]
    const [label, value] = formatToolTip(tooltipData)

    return <FancyValue icon={icon} label={label} value={value} />
  }

  const minY = Math.min(...(price || []).map<number>(({ y }) => y))
  const maxY = Math.max(...(price || []).map<number>(({ y }) => y))
  const minimumYAxisLabel = minY - 5 > 0 ? minY - 5 : 0

  return (
    <Container size='lg'>
      {title && <ChartTitle>{title}</ChartTitle>}
      <ChartContainer>
        <LineChart
          data={price}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          <Line
            type='monotone'
            dataKey='y'
            dot={false}
            stroke={'url(#gradient)'}
            strokeWidth={2}
          />
          <YAxis
            stroke={theme.colors.grey[500]}
            tickFormatter={(n) => '$' + formatFloats(n)}
            axisLine={false}
            tickLine={false}
            mirror={true}
            tick={{ fontFamily: 'Roboto Mono' }}
            ticks={[minimumYAxisLabel, maxY + 5]}
            domain={[minY - 10, maxY + 10]}
          />
          <Tooltip
            content={renderTooltip}
            wrapperStyle={{ backgroundColor: theme.baseColor }}
            cursor={{ stroke: theme.colors.primary.light, strokeWidth: 2 }}
          />
          <defs>
            <linearGradient id='gradient' gradientTransform='rotate(90)'>
              <stop offset='5%' stopColor='#8150E6' />
              <stop offset='95%' stopColor='#E825A3' />
            </linearGradient>
          </defs>
        </LineChart>
      </ChartContainer>
      <DurationWrapper>
        <ButtonWrapper>
          <Button
            full
            size={'sm'}
            text='1D'
            variant={
              durationSelector === Durations.DAILY ? 'default' : 'secondary'
            }
            onClick={handleDailyButton}
          />
          <Spacer size={'sm'} />
          <Button
            full
            size={'sm'}
            text='1W'
            variant={
              durationSelector === Durations.WEEKLY ? 'default' : 'secondary'
            }
            onClick={handleWeeklyButton}
          />
          <Spacer size={'sm'} />
          <Button
            full
            size={'sm'}
            text='1M'
            variant={
              durationSelector === Durations.MONTHLY ? 'default' : 'secondary'
            }
            onClick={handleMonthlyButton}
          />
        </ButtonWrapper>
      </DurationWrapper>
    </Container>
  )
}

const ChartContainer = styled(ResponsiveContainer)`
  min-height: 25rem;
`

const ChartTitle = styled.h2`
  font-size: 42px;
`

const DurationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const ButtonWrapper = styled.div`
  display: flex;
  padding-bottom: 20px;
`

export default MarketDataChart

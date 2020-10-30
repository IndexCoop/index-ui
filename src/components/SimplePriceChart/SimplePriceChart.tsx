import React from 'react'
import { Container, useTheme } from 'react-neu'
import numeral from 'numeral'
import styled from 'styled-components'

import FancyValue from 'components/FancyValue'
import { ResponsiveContainer, LineChart, Line, YAxis, Tooltip } from 'recharts'
// docs - http://recharts.org/en-US/guide/

interface SimplePriceChartProps {
  title?: string
  showTooltip?: boolean
  icon: {
    src: string
    alt: string
  }
  data?: {
    x: string | number
    y: number
  }[]
  readTooltipData?: Function
}

const MarketDataChart: React.FC<SimplePriceChartProps> = ({
  title,
  showTooltip,
  icon,
  data,
  readTooltipData,
}) => {
  const theme = useTheme()
  const formatFloats = (n: number) => parseFloat(numeral(n).format('0.00a'))
  const formatToolTip = (chartData: any) => {
    if (!chartData) return ['--', 'No Data Available']
    const {
      payload: { x, y },
    } = chartData
    return [new Date(x).toLocaleDateString(), '$' + formatFloats(y)]
  }

  const renderTooltip = (props: any) => {
    const tooltipData = props.payload?.[0]

    if (readTooltipData && tooltipData) {
      setTimeout(readTooltipData, 0, tooltipData)
    }

    if (!showTooltip) return null

    const [label, value] = formatToolTip(tooltipData)
    return <FancyValue icon={icon} label={label} value={value} />
  }

  const minY = Math.min(...(data || []).map<number>(({ y }) => y))
  const maxY = Math.max(...(data || []).map<number>(({ y }) => y))
  const minimumYAxisLabel = minY - 5 > 0 ? minY - 5 : 0

  return (
    <Container size='lg'>
      {title && <ChartTitle>{title}</ChartTitle>}
      <ChartContainer>
        <LineChart data={data}>
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
    </Container>
  )
}

const ChartContainer = styled(ResponsiveContainer)`
  min-height: 25rem;
`

const ChartTitle = styled.h2`
  font-size: 42px;
`

export default MarketDataChart

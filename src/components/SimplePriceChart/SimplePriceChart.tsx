import React from 'react'
import { Container, useTheme } from 'react-neu'
import numeral from 'numeral'
import styled from 'styled-components'

import FancyValue from 'components/FancyValue'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
// docs - http://recharts.org/en-US/guide/

interface SimplePriceChartProps {
  symbol?: string
  title?: string
  icon: {
    src: string
    alt: string
  }
  data?: {
    x: string | number
    y: number
  }[]
}

const MarketDataChart: React.FC<SimplePriceChartProps> = ({ title, icon, data }) => {
  const theme = useTheme()
  const formatFloats = (n: number) => parseFloat(numeral(n).format('0.00a'))
  const formatToolTip = (chartData: any) => {
    if (!chartData) return ['--', 'No Data Available']
    const { payload: { x, y } } = chartData
    return [new Date(x).toLocaleDateString(), '$' + formatFloats(y)]
  }

  const renderTooltip = (props: any) => {
    const [label, value] = formatToolTip(props.payload[0])
    return (
      <FancyValue
        icon={icon}
        label={label}
        value={value}
      />
    )
  }

  const minY = Math.min(...(data || []).map<number>(({ y }) => y))
  const maxY = Math.max(...(data || []).map<number>(({ y }) => y))
  return (
    <Container>
      <ChartTitle>
        {/* <TitleIcon src={icon.src} alt={icon.alt} /> */}
        {title}
      </ChartTitle>
      <ChartContainer>
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey={'y'}
            dot={false}
            stroke={theme.colors.white}
          />
          <XAxis
            dataKey="x"
            stroke={theme.colors.white}
            tickFormatter={x => new Date(x).toLocaleDateString()}
            minTickGap={20}
          />
          <YAxis
            stroke={theme.colors.white}
            tickFormatter={n => '$' + formatFloats(n)}
            domain={[
              // crop chart by ±20% of min/max values
              formatFloats(minY - (minY / 5)),
              formatFloats(maxY + (maxY / 5))
            ]}
          />
          <Tooltip
            content={renderTooltip}
            wrapperStyle={{ backgroundColor: theme.baseColor }}
            cursor={{ stroke: theme.colors.white, strokeWidth: 2 }}
          />
        </LineChart>
      </ChartContainer>
    </Container>
  );
}

const ChartContainer = styled(ResponsiveContainer)`
  min-height: 25rem;
`

const ChartTitle = styled.h2`
  font-size: 64px;
`

const TitleIcon = styled.img`
  display: inline-block;
  height: 150%;
  width: auto;
  margin-right: 1rem;
`

export default MarketDataChart
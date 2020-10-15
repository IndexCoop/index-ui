import React from 'react'
import { Container, useTheme } from 'react-neu'
import numeral from 'numeral'
import styled from 'styled-components'

import {
	ResponsiveContainer,
	LineChart,
	Line,
	XAxis,
	YAxis,
	Label,
	Tooltip
} from 'recharts';
// docs - http://recharts.org/en-US/guide/

interface MarketDataChartProps {
	symbol?: string
	chartType?: string
	data?: {
		x: string | number
		y: number
	}[]
}

const MarketDataChart: React.FC<MarketDataChartProps> = ({ symbol, chartType, data }) => {
	const  theme = useTheme()
	const formatFloats = (n: number) => parseFloat(numeral(n).format('0.00a'))
	const formatToolTip = (_: any, __: any, props: any) => {
		const { payload: { y } } = props
		return [formatFloats(y), chartType];
	}

	const minY = Math.min(...(data || []).map<number>(({ y }) => y))
	const maxY = Math.max(...(data || []).map<number>(({ y }) => y))
	return (
		<Container>
			<ChartTitle> {symbol} {chartType} </ChartTitle>
			<ChartContainer>
				<LineChart data={data}>
					<Label value={`${symbol}: ${chartType}`} offset={0} position="insideTop" />
					<Line type="monotone" dataKey={'y'} stroke={theme.colors.white} />
					<XAxis
						dataKey="x"
						stroke={theme.colors.white}
						tickFormatter={x => new Date(x).toLocaleDateString('en-US')}
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
					{/* <Tooltip
						formatter={formatToolTip}
						cursor={{ stroke: theme.colors.white, strokeWidth: 2 }}
						contentStyle={{ color: theme.colors.black }}
					/> */}
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

export default MarketDataChart
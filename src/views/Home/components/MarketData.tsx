import React from 'react'

import numeral from 'numeral'
import { Container, Card, CardContent, Spacer } from 'react-neu'

import FancyValue from 'components/FancyValue'
import Split from 'components/Split'
import MarketDataChart from 'components/MarketDataChart'

import useMarketData from 'hooks/useMarketData';


const MarketData: React.FC = () => {
	const { latestVolume, latestMarketCap, ...data } = useMarketData()
  return (
		<>
			<Container>
				<Split>
					<Card>
						<CardContent>
							<FancyValue
								icon={{
									src: 'https://index-dao.s3.amazonaws.com/money.png',
									alt: 'Money',
								}}
								label='$DPI 24hr Volume'
								value={'$' + numeral(latestVolume).format('0.00a')}
							/>
						</CardContent>
					</Card>

					<Card>
						<CardContent>
							<FancyValue
								icon={{
									src: 'https://index-dao.s3.amazonaws.com/money.png',
									alt: 'Money',
								}}
								label='$DPI Marketcap'
								value={'$' + numeral(latestMarketCap).format('0.00a')}
							/>
						</CardContent>
					</Card>
				</Split>
			</Container>
			<Spacer size="lg" />
			<MarketDataChart
				symbol='$DPI'
				chartType='Monthly Price'
				data={data.prices?.map(([x, y]) => ({ x, y }))}
			/>
			<Spacer size="lg" />
		</>
  )
}

export default MarketData

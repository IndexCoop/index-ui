import React, { useEffect } from 'react'
import { Container } from 'react-neu'

import Page from 'components/Page'
import {
  ProductPageHeader,
  ProductPageContent,
  PriceChanges,
  WalletBalance,
  Description,
  IndexComponentsTable,
} from 'components/ProductPage'
import MarketData from './components/MarketData'
import { BuySellWrapper } from 'components/BuySell'
import ExternalLink from 'components/ExternalLink'

import useFliTokenMarketData from 'hooks/useFliTokenMarketData'
import useFliIndexPortfolioData from 'hooks/useFliIndexPortfolioData'
import useBalances from 'hooks/useBalances'

const FliProductPage = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [])

  const { prices, latestPrice } = useFliTokenMarketData()
  const { components, symbol } = useFliIndexPortfolioData()
  const { fliBalance } = useBalances()

  return (
    <Page>
      <Container size='lg'>
        <ProductPageHeader>
          <MarketData />
          <div>
            <BuySellWrapper tokenId='ethfli' />
          </div>
        </ProductPageHeader>
        <ProductPageContent>
          <WalletBalance
            symbol={symbol}
            latestPrice={latestPrice}
            currentBalance={fliBalance}
          />
          <PriceChanges prices={prices} />
          <IndexComponentsTable components={components} />
          <Description>
            <strong>The Ethereum Flexible Leverage Index</strong> lets you
            leverage a collateralized debt position in a safe and efficient way,
            by abstracting its management into a simple index. It enables market
            participants to take on leverage while minimizing the transaction
            costs and risks associated with maintaining collateralized debt.
            <h2>Objective</h2>
            The Ethereum Flexible Leverage Index (ETH2X-FLI) makes leverage
            effortless. The end user does not have to worry about:
            <ul>
              <li>
                Monitoring their leveraged loan 24/7, having to always be ready
                to act.
              </li>

              <li>
                High fees, transactions not being included fast enough or the
                relative UIs being unresponsive during times of high volatility.
              </li>

              <li>
                Paying for overpriced stablecoins to deleverage on time or panic
                trading to save their positions.
              </li>

              <li>Being liquidated and having to pay the penalty.</li>
            </ul>
            ETH2X-FLI has several key advantages over Legacy Leveraged Tokens:
            <ul>
              <li>Zero slippage via composable entry and exit.</li>

              <li>
                Unique Index algorithm reduces rebalancing needs by an order of
                magnitude.
              </li>

              <li>
                Emergency deleveraging possible during Black Swan events for
                additional fund safety.
              </li>
            </ul>
            <ExternalLink
              href='https://pulse.inc/flexible-leverage-index'
              target='_blank'
            >
              <h4>View the methodology here.</h4>
            </ExternalLink>
          </Description>
        </ProductPageContent>
      </Container>
    </Page>
  )
}

export default FliProductPage

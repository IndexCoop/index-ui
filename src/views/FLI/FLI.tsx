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
            <strong>The Ethereum Flexible Leverage Index</strong> is a
            capitalization-weighted index that tracks the performance of
            decentralized financial assets across the market.
            <h2>Real Leverage</h2>
            The Real Leverage is the current leverage ratio of the Set. The Real
            Leverage is calculated by dividing the value of cETH position of the
            Set by the total value of the Set (the total value of the Set should
            always be less than its cETH position, since it also contains a debt
            position). The Real Leverage ratio may differ from the Target
            Leverage ratio.
            <h2>Target Leverage</h2>
            The Target Leverage is the ideal leverage ratio of the product. If
            the Set is below or above the target leverage ratio, it will post or
            pull collateral until the target leverage ratio is met.
            <h2>Debt Position Health</h2>
            The Debt Position Health is the value of the collateral divided by
            the value of the borrowed assets. If the debt ratio drops below 125%
            the debt position will automatically be liquidated.
          </Description>
        </ProductPageContent>
      </Container>
    </Page>
  )
}

export default FliProductPage

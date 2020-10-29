import React from 'react'
import { Container, Spacer } from 'react-neu'

import Page from 'components/Page'
import {
  ProductPageHeader,
  ProductPageContent,
  TokenStats,
  PriceChanges,
  WalletBalance,
} from 'components/ProductPage'
import { BuyTokenPlaceholder } from 'components/BuyToken'
import MarketData from './components/MarketData'

import useDpiTokenMarketData from 'hooks/useDpiTokenMarketData'
import useBalances from 'hooks/useBalances'

const DpiProductPage: React.FC = () => {
  const {
    prices,
    latestPrice,
    latestMarketCap,
    latestVolume,
  } = useDpiTokenMarketData()
  const { dpiBalance } = useBalances()
  return (
    <Page>
      <Container size='lg'>
        <ProductPageHeader>
          <MarketData />
          <BuyTokenPlaceholder />
        </ProductPageHeader>
        <ProductPageContent>
          <WalletBalance
            symbol='DPI'
            latestPrice={latestPrice}
            currentBalance={dpiBalance}
          />
          <PriceChanges prices={prices} />
          <TokenStats
            latestPrice={latestPrice}
            latestVolume={latestVolume}
            latestMarketCap={latestMarketCap}
          />
        </ProductPageContent>
      </Container>
    </Page>
  )
}

export default DpiProductPage

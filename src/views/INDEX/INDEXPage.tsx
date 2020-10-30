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

import useIndexTokenMarketData from 'hooks/useIndexTokenMarketData'
import useBalances from 'hooks/useBalances'

const DpiProductPage: React.FC = () => {
  const {
    prices,
    latestPrice,
    latestMarketCap,
    latestVolume,
  } = useIndexTokenMarketData()
  const { indexBalance } = useBalances()
  return (
    <Page>
      <Container size='lg'>
        <ProductPageHeader>
          <MarketData />
          <BuyTokenPlaceholder />
        </ProductPageHeader>
        <ProductPageContent>
          <WalletBalance
            symbol='INDEX'
            latestPrice={latestPrice}
            currentBalance={indexBalance}
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

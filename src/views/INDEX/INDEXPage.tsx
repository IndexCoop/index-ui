import React from 'react'
import { Container } from 'react-neu'
import styled from 'styled-components'

import Page from 'components/Page'
import {
  ProductPageHeader,
  ProductPageContent,
  TokenStats,
  PriceChanges,
  WalletBalance,
  Description,
} from 'components/ProductPage'
import { BuyTokenPlaceholder } from 'components/BuyToken'
import MarketData from './components/MarketData'

import useIndexTokenMarketData from 'hooks/useIndexTokenMarketData'
import useBalances from 'hooks/useBalances'

import IndexReleaseScheduleImage from 'assets/index-token-release-schedule.png'

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
          <Description>
            <p>
              <strong>INDEX</strong> is the governance token which presides over
              the Index Cooperative.
              <h2>What is the Index Coop?</h2>
              The Index Coop is a collective aimed at creating and maintaining
              the best crypto indices on the market. The coop creates crypto
              ETPs (exchange traded products) that help users get broad exposure
              to different sectors or themes across crypto. As the first
              flagship product, Index has created the DeFi Pulse Index that
              provides broad DeFi exposure for its users by holding one token.
              <h2>Token Characteristics</h2>
              INDEX is used to vote in changes to the Index Coop including but
              not limited to:
              <ul>
                <li>Smart contract upgrades to the Index Coop</li>
                <li>How to allocate the Index Coop treasury</li>
                <li>Add new Index Cooop products</li>
                <li>Ratifying rebalance trades for Index Coop products</li>
              </ul>
              <h2>Token Release Schedule</h2>
              <StyledDpiIndexCalculationImage src={IndexReleaseScheduleImage} />
            </p>
          </Description>
        </ProductPageContent>
      </Container>
    </Page>
  )
}

const StyledDpiIndexCalculationImage = styled.img`
  margin: 40px 20px;
`

export default DpiProductPage

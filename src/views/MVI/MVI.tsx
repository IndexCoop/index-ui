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
import { BuySellWrapper } from 'components/BuySell'
import MarketData from 'components/MarketData'

import useMviTokenMarketData from 'hooks/useMviTokenMarketData'
import useMviComponents from 'hooks/useMviComponents'
import useBalances from 'hooks/useBalances'
import { MetaverseIndex } from 'constants/productTokens'

const MviProductPage = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  const { latestPrice, prices, hourlyPrices } = useMviTokenMarketData()
  const { components } = useMviComponents()
  const { mviBalance } = useBalances()

  return (
    <Page>
      <Container size='lg'>
        <ProductPageHeader>
          <MarketData
            prices={prices || [[0]]}
            hourlyPrices={hourlyPrices || [[0]]}
            latestPrice={latestPrice || 0}
            tokenIcon={{
              src: MetaverseIndex.image,
              alt: MetaverseIndex.symbol + ' Logo',
            }}
            tokenSymbol={MetaverseIndex.symbol}
            title={MetaverseIndex.name}
          />
          <BuySellWrapper tokenId='mvi' />
        </ProductPageHeader>
        <ProductPageContent>
          <WalletBalance
            symbol='MVI'
            latestPrice={latestPrice}
            currentBalance={mviBalance}
          />
          <IndexComponentsTable components={components} />
          <Description>
            <p>
              <strong>The Metaverse Index (MVI)</strong> is designed to capture
              the trend of entertainment, sports and business shifting to take
              place in virtual environments.
              <h2>Constituent Weighting</h2>
              Selection of the $MVI tokens is based on the following basic
              criteria:
              <ul>
                <li>The token must be available on the Ethereum blockchain.</li>
                <li>
                  Protocol must be in one of the following token categories on
                  Coingecko: Non Fungible Tokens, Entertainment, Virtual
                  Reality, Augmented Reality and Music. More categories will be
                  added in the future as the market matures.
                </li>
                <li>Total market cap must be over $30m.</li>
                <li>
                  Protocol must have at least 3 months history of operation and
                  its token must have at least 3 months of price and liquidity
                  history.
                </li>
                <li>
                  Token must have reasonable and consistent DEX liquidity on
                  Ethereum.
                </li>
                <li>
                  An independent security audit should have been performed on
                  the protocol and results reviewed by the product
                  methodologist. In the case that no audit has been performed,
                  the methodologist applies subjective judgement of the protocol
                  based on assessment of the criteria above and communications
                  with the team.
                </li>
                <li>
                  In the event of a security issue the methodologist will work
                  with the project team to understand the issue and any effects
                  to $MVI holdings. The team is expected to provide users of the
                  protocol with a reliable solution and adequate documentation
                  to ensure transparency about any incidents.
                </li>
                <li>
                  Tokens will not be staked at the launch of the index. This is
                  subject to change as liquidity increases and it becomes
                  possible to safely generate yield through staking.
                </li>
              </ul>
              <h2>Index Calculation</h2>
              <p>
                The $MVI uses a combination of root market cap and liquidity
                weighting to arrive at the final index weights. We believe that
                liquidity is an important consideration in this space and should
                be considered when determining portfolio allocation.
              </p>
              <p>TW = 75%*RMCW + 25%*LW</p>
              <p>where,</p>
              <p>TW – token weight in the $MVI</p>
              <p>RMCW – square root of market cap weighted allocation</p>
              <p>LW – liquidity weighted allocation</p>
              <h2>Index Maintenance</h2>
              The index is maintained monthly in two phases:
              <ul>
                <li>
                  Determination phase: During the determination phase, the
                  tokens being added and deleted from the index calculation are
                  determined during the final week of the month and published
                  before monthly rebalancing.
                </li>
                <li>
                  Rebalancing phase: Following publication of the determination
                  phase outcome, the index composition will change to the new
                  weights during the first week of the following month.
                </li>
              </ul>
            </p>
          </Description>
        </ProductPageContent>
      </Container>
    </Page>
  )
}

export default MviProductPage

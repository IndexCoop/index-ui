import React, { useEffect } from 'react'
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
  IndexComponentsTable,
} from 'components/ProductPage'
import { BuySellWrapper } from 'components/BuySell'
import ExternalLink from 'components/ExternalLink'
import MarketData from './components/MarketData'

import useCgiTokenMarketData from 'hooks/useCgiTokenMarketData'
import useCgiIndexComponents from 'hooks/useCgiIndexComponents'
import useBalances from 'hooks/useBalances'

import DpiIndexCalculationImage from 'assets/dpi-index-calculation.png'

const CgiProductPage = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [])

  const {
    prices,
    latestPrice,
    latestMarketCap,
    latestVolume,
  } = useCgiTokenMarketData()
  const { components } = useCgiIndexComponents()
  const { cgiBalance } = useBalances()

  return (
    <Page>
      <Container size='lg'>
        <ProductPageHeader>
          <MarketData />
          <BuySellWrapper tokenId='cgi' />
        </ProductPageHeader>
        <ProductPageContent>
          <WalletBalance
            symbol='CGI'
            latestPrice={latestPrice}
            currentBalance={cgiBalance}
          />
          <PriceChanges prices={prices} />
          <IndexComponentsTable components={components} />
          <TokenStats
            latestPrice={latestPrice}
            latestVolume={latestVolume}
            latestMarketCap={latestMarketCap}
          />
          <Description>
            The{' '}
            <strong>
              CoinShares Gold and Cryptoassets Index Lite Version (CGCI-LV)
            </strong>{' '}
            is an adaptation of the original EU Benchmark Regulated index
            launched by the CoinShares Group in 2020 that only includes ERC-20
            tokens in order to be compatible in a tokenized index smart
            contract. Since the original CGCI is constructed using physical gold
            and 5 individual cryptoassets some re-engineering of the initial
            structure was required, whilst ensuring that the core theory and
            value proposition was preserved.
            <ExternalLink
              href='https://coinshares.com/products-services/index-strategies'
              target='_blank'
            >
              <h4>see here</h4>
            </ExternalLink>{' '}
            The CGCI-LV therefore deploys the same theory but instead limits the
            index to 3 ERC-20 token constituents; a gold stablecoin and 2
            cryptoassets. For the gold basket, wrapped-DGLD (wDGLD) was chosen
            as the ERC-20 gold stablecoin.
            <br />
            For the cryptoasset basket wrapped-bitcoin (wBTC) and wrapped-Ether
            (wETH) were selected based on being the largest and most established
            cryptoassets.
            <h2>Abstract</h2>
            Academic research conducted in partnership with Imperial College
            London found that a pairing of gold and cryptoassets in a way that
            accounts for their risk contribution delivers a risk-adjusted return
            profile that is superior to holding gold or cryptoassets alone. The
            CGCI-LV is designed with the aim of providing diversified exposure
            to the alternative asset space in a way that yields a superior
            risk-return profile when compared to holding such assets in
            isolation while being orthogonal to traditional financial markets.
            Accordingly, the Index must:
            <ul>
              <li>
                Be comprised of a small number of liquid, investable constituent
                assets
              </li>
              <li>
                Exhibit a relatively stable composition of asset weights that do
                not vary dramatically between rebalancing periods, leading to
                low turnover
              </li>
              <li>
                Utilise some means of principled risk control leading to lower
                volatility
              </li>
              <li>
                Be specified in a clear and unambiguous manner to facilitate
                validation and reproducibility
              </li>
              <li>Hold constituent assets on a long basis only</li>
              <li>Not make use of leverage.</li>
            </ul>
            <h4>Motivation</h4>
            <p>
              Two noteworthy characteristics of the returns of non-stablecoin
              cryptoassets are their high volatility, which brings with it a
              high level of risk, and their high intraclass correlation, which
              limits the benefits that can be had by diversifying across
              multiple cryptoassets. Yet cryptoassets exhibit no correlation
              with gold, a highly-liquid yet scarce asset which has proved to
              function as a safe haven during crises affecting traditional
              financial systems.
            </p>
            <p>
              Although volatility poses challenges in terms of increased
              uncertainty, there are also benefits to be had from its proper
              management through diversification and regular rebalancing
              (Bouchey et al., 2012, The Journal of Wealth Management.
              Volatility harvesting: Why does diversifying and rebalancing
              create portfolio growth?). This is exemplified by the so-called
              Shannon’s Demon approach in which two, ideally uncorrelated,
              assets – at least one of which is highly volatile – are
              periodically rebalanced to maintain an ideal target allocation.
              The resulting expected growth rate is greater than the arithmetic
              mean of the individual expected growth rates, while the variance
              of the returns is less than the mean of the individual variances
              (Poundstone, 2005. Fortune’s Formula.).
            </p>
            <p>
              The CGCI-LV is intended to be a low-volatility index that utilises
              the concept of volatility harvesting through (a) forming a basket
              of cryptoassets and (b) combining it with gold using weighted-risk
              contribution as a rebalancing mechanism. By decreasing volatility
              levels, it seeks to yield superior risk-adjusted returns when
              compared to a number of alternative strategies, including holding
              cryptoassets or gold alone. Further, it presents a moderate
              turnover, which should translate into moderate operating costs.
            </p>
            <h4>Size of opportunity</h4>
            <p>
              The CGCI has already gained a lot of demand and CoinShares is
              currently investigating opportunities to deploy the index as an
              investable benchmark in its passive products business.
              Additionally, it is anticipated that the CGCI-LV would likely be
              well received by the native crypto community and is expected to be
              picked up by CEXs to offer it to their users.
            </p>
            <h2>Liquidity commitment</h2>
            Liquidity and assets will be committed. The gold stablecoin issuer
            will also commit assets and liquidity.
            <h2>Differentiation</h2>
            While there are several existing cryptoasset indices that offer
            broad exposure to crypto assets through market capitalization
            weighting, they have proven to be limited in risk diversification
            due to the high correlation among cryptoassets and are characterised
            by a volatility close to that of a single cryptoasset. CoinShares
            developed the index to bring more effective risk control to
            cryptoasset index products.
            <h4>Statistics</h4>
            Annualised Return: 0.4604
            <br />
            Annualised Std Dev: 0.2498
            <br />
            Annualised Sharpe (Rf=0%): 1.8431
            <br />
            Annualised Sortino (Rf=0%): 3.0473
            <br />
            Annualised Avg Turnover: 1.0233
            <br />
            Year-to-Year Return (%): 60.9701
            <br />
            30-day High: 7355 30-day
            <br />
            Low: 6635.82
            <br />
            Return Since Inception (%): 632.248
            <br />
            Source: CoinShares.
            <br />
            The CGCI-LV was launched on October 28th, 2020. Figures for the
            CGCI-LV prior to this date have been derived by applying the
            methodology described on this page. The crypto-basket price base
            level was set to 100 on July 1st, 2015. The Index base level was set
            to 1,000 on January 1st, 2016. Calculations do not include fees and
            expenses. Past performance is no indication of future performance.
            <h2>On-chain liquidity analysis</h2>
            All assets are supported by on-chain liquidity providers and
            committed resources will be mandated to maintain liquidity for the
            CGCI-LV.
            <h2>Fee Split</h2>
            CGCI-LV will have an annual streaming fee of 0.60% (60 basis
            points). Revenue from the annual streaming fee will be split with
            60% to CoinShares, 40% to the Index Coop.
            <h2>Methodology</h2>
            <h4>Constituent Weighting:</h4>
            For the constituent weighting, we examine each constituent’s native
            asset (i.e. for wrapped-bitcoin we investigate bitcoin, for
            wrapped-DGLD we investigate DGLD, etc.). We follow a bi-level
            approach that involves studying the historical volatilities of a
            crypto-basket (containing BTC and ETH) and gold (DGLD), separately
            in order to inform the crypto-gold asset allocation decision.The
            Index is calculated following a two-stage allocation scheme that
            involves:
            <ul>
              <li>
                Computation of the historical volatility of (a) the Equally
                weighted crypto-basket, and (b) DGLD;
              </li>
              <li>
                Asset allocation among the crypto-basket and DGLD expressed as
                the bivariate weighted risk contribution problem.
              </li>
            </ul>
            <h4>Rebalancing schedule:</h4>
            In order to fully capture the diversification benefits of the time
            varying correlations between gold and the cryptobasket, a monthly
            rebalancing frequency is employed. Constituent weights are announced
            on the last business day of the running month. The rebalancing is
            employed on the first business day of the following month.
            <h4>Index Calculation:</h4>
            In the CGCI-LV, the crypto-basket is formulated as an Equally
            Weighted basket of 2 defined cryptoassets, each with a weight of
            0.5. The crypto-basket price base level is set on 100 on July 1st,
            2015. The Index base level is set on 1 000 on January 1st, 2016.
          </Description>
        </ProductPageContent>
      </Container>
    </Page>
  )
}

const StyledCgiIndexCalculationImage = styled.img`
  margin-bottom: 20px;
  width: 100%;
`

export default CgiProductPage

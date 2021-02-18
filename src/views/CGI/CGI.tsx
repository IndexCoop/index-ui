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
import ExternalLink from 'components/ExternalLink'
import MarketData from './components/MarketData'

import useCgiTokenMarketData from 'hooks/useCgiTokenMarketData'
import useCgiIndexComponents from 'hooks/useCgiIndexComponents'
import useBalances from 'hooks/useBalances'

const CgiProductPage = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [])

  const { prices, latestPrice, latestVolume } = useCgiTokenMarketData()
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
          {/* <TokenStats
            latestPrice={latestPrice}
            latestVolume={latestVolume}
            latestMarketCap={latestMarketCap}
          /> */}
          <Description>
            <p>
              <strong>
                The CoinShares Gold and Cryptoassets Index Lite (CGI)
              </strong>{' '}
              is a low-volatility index that utilises the concept of volatility
              harvesting through (a) forming an equally-weighted basket of
              cryptoassets ($BTC and $ETH) and (b) combining it with gold using
              a weighted-risk contribution as a rebalancing mechanism. By
              decreasing volatility levels, the CGI seeks to yield superior
              risk-adjusted returns when compared to a number of alternative
              strategies, including holding cryptoassets or gold alone. Further,
              it presents a moderate turnover, which should translate into
              moderate operating costs.
            </p>
            <p>
              The CGI is an adaptation of the CoinShares Gold and Cryptoassets
              Index (CGCI) that was launched by CoinShares in 2020 and is one of
              the first EU Benchmark Regulated (EU BMR) indices for
              cryptoassets.
            </p>
            <h2>Objective</h2>
            <p>
              The CGI is designed with the aim of providing diversified exposure
              to the alternative asset space in a way that yields a superior
              risk-return profile when compared to holding such crypto and gold
              in isolation.
            </p>
            <p>
              Two noteworthy characteristics of the returns of cryptoassets are
              their high volatility, which brings with it a high level of risk,
              and their high intraclass correlation, which limits the benefits
              that can be had by diversifying across multiple cryptoassets. Yet
              cryptoassets exhibit no correlation with gold, a highly-liquid yet
              scarce asset which has proved to function as a safe haven during
              crises affecting traditional financial systems. Although
              volatility poses challenges in terms of increased uncertainty,
              there are also benefits to be had from its proper management
              through diversification and regular rebalancing. This is
              exemplified by the so-called Shannon’s Demon approach in which
              two, ideally uncorrelated, assets – at least one of which is
              highly volatile – are periodically rebalanced to maintain an ideal
              target allocation. The resulting expected growth rate is greater
              than the arithmetic mean of the individual expected growth rates,
              while the variance of the returns is less than the mean of the
              individual variances.
            </p>
            <h2>Constituent Weighting</h2>
            <p>
              The CGI follows a bi-level approach that involves studying the
              historical volatilities of the crypto-basket ($BTC and $ETH) and
              gold ($DGLD) separately in order to inform the crypto-gold asset
              allocation decision.
            </p>
            <p>
              The CGI is calculated following a two-stage allocation scheme that
              involves:
            </p>
            <ul>
              <li>
                Computation of the historical volatility of the equally-weighted
                crypto-basket and gold.
              </li>
              <li>
                Asset allocation between the crypto-basket and gold is expressed
                using the bivariate weighted risk contribution problem. The risk
                contribution ratio is set as α = 9, indicating that 90% of the
                total risk emanates from the crypto-basket. This accounts for a
                proper risk contribution and delivers a risk and return profile
                that is superior to holding gold or cryptoassets alone.
              </li>
            </ul>
            <h2>Rebalancing Mechanism</h2>
            <p>
              In order to fully capture the diversification benefits of the time
              varying correlations between gold and the cryptobasket, a monthly
              rebalancing frequency is employed. Constituent weights are
              announced on the last business day of the running month. The
              rebalancing is employed on the first business day of the following
              month.
            </p>
            <h2>Index Calculation</h2>
            <p>
              The index level is calculated as described in section 2 of the
              methodology available{' '}
              {
                <ExternalLink
                  href='https://coinshares.com/assets/resources/cgi-methodology.pdf'
                  target='_blank'
                >
                  here.
                </ExternalLink>
              }
            </p>

            <h2>Data Handling</h2>
            <p>
              The following rounding of data are used for the Index calculation
              and publication:
              <ul>
                <li>Prices are rounded to eight significant figures</li>
                <li>
                  Weights are rounded to four decimal places Index levels are
                </li>
                <li>rounded to two decimal places</li>
              </ul>
            </p>
            <ExternalLink
              href='https://coinshares.com/assets/resources/cgi-methodology.pdf'
              target='_blank'
            >
              <h4>CoinShares full methodology is accessible here.</h4>
            </ExternalLink>
          </Description>
        </ProductPageContent>
      </Container>
    </Page>
  )
}

export default CgiProductPage

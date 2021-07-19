import React, { useEffect } from 'react'
import styled from 'styled-components'
import ExternalLink from 'components/ExternalLink'
import useBedTokenMarketData from 'hooks/useBedTokenMarketData'
import useBedIndexComponents from 'hooks/useBedIndexComponents'
import useBalances from 'hooks/useBalances'
import { BedIndex } from 'constants/productTokens'
import ProductDataUI, {
  TokenDataProps,
} from 'components/ProductPage/ProductDataUI'

const BedProductPage = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  const { prices, hourlyPrices, latestPrice, latestMarketCap, latestVolume } =
    useBedTokenMarketData()
  const { components } = useBedIndexComponents()
  const { bedBalance, bedTotalSupply } = useBalances()
  const tokenDataProps: TokenDataProps = {
    prices: prices,
    hourlyPrices: hourlyPrices,
    latestPrice: latestPrice,
    latestMarketCap: latestMarketCap,
    latestVolume: latestVolume,
    token: BedIndex,
    components: components,
    balance: bedBalance,
    currentSupply: bedTotalSupply,
  }

  return (
    <ProductDataUI tokenDataProps={tokenDataProps}>
      <p>
        Bankless proposed that the Index Coop manage a Set based on an index of
        Crypto’s most investable assets, BTC, ETH, and DPI, in equal weight.
        This construction — known as the BED Index or Bankless BED Index — seeks
        to give safe, passive exposure to a vehicle that captures equal-weighted
        upside from the most promising use cases and themes in crypto: store of
        value, programmable money, and decentralized finance.
        <h2>Methodology</h2>
        The BED index is meant to track crypto’s top 3 investable assets.
        <ol>
          <li>
            <strong>Scope:</strong> The index includes the top 3 investable
            assets with real usage and large capitalizations around the theme of
            blockchain: BTC, ETH, DeFi (DPI).
          </li>
          <li>
            <strong>Weighting:</strong> Neutral construction, equal weight
          </li>
          <li>
            <strong>Rebalancing:</strong> First Friday of every month
          </li>
        </ol>
        The composition is:
        <ul>
          <li>33.3% Bitcoin</li>
          <li>33.3% Ether</li>
          <li>33.3% DPI</li>
        </ul>
        The underlying index is rebalanced after the close of trading on the
        first Friday of each calendar month. The Fund is rebalanced in
        accordance with its Underlying Index.
        <h2>Component Selection</h2>
        <h3>Market Requirements</h3>
        <ul>
          <li>
            The components must have a Large cap valuation $25b+ [If an Index,
            the corresponding token market caps must have a sum of {'>'}$25b].
          </li>
          <li>
            The components must show signs of heavy usage either as a network
            (btc, eth) or smart contract theme (DeFi).
          </li>
          <li>
            The assets must have sufficient liquidity for initial inclusion and
            rebalances.
          </li>
        </ul>
        <h3>Safety Requirements</h3>
        <ul>
          <li>
            Assets and themes within the Bankless BED Index should have vast,
            well-established safety guarantees.
          </li>
          <li>
            Any network/protocol must have conducted sufficient security audits
            and/or security professionals must have reviewed the protocol to
            determine that security best practices have been followed.
          </li>
        </ul>
        <h2>Index Maintenance</h2>
        BED is maintained monthly in two phases:
        <h3>Determination Phase</h3>
        <p>
          The determination phase takes place during the fourth week of the
          month. It is the phase when the changes needed for the next
          reconstitution are determined.
        </p>
        <h3>Reconstitution Phase</h3>
        <p>
          Following publication of the determination phase outcome, the index
          composition will change to the new weights on the first friday of the
          following month. I.e components will be added or removed.
        </p>
      </p>
    </ProductDataUI>
  )
}

const StyledBedIndexCalculationImage = styled.img`
  margin-bottom: 20px;
  width: 100%;
`

export default BedProductPage

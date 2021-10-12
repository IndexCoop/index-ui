import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import ExternalLink from 'components/ExternalLink'
import useDpiTokenMarketData from 'hooks/useDpiTokenMarketData'
import useDpiIndexComponents from 'hooks/useDpiIndexComponents'
import useBalances from 'hooks/useBalances'
import DpiIndexCalculationImage from 'assets/dpi-index-calculation.png'
import useLocalStorage from 'hooks/useLocalStorage'
import { DefiPulseIndex, ProductToken } from 'constants/productTokens'
import ProductDataUI, {
  TokenDataProps,
} from 'components/ProductPage/ProductDataUI'
import useStreamingFee from 'hooks/useStreamingFee'
import useTokenSupply from 'hooks/useTokenSupply'
import useSetComponents from "hooks/useSetComponents"

const DpiProductPage = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  const { prices, hourlyPrices, latestPrice, latestMarketCap, latestVolume } =
    useDpiTokenMarketData()
  const { components } = useDpiIndexComponents()
  const { dpiBalance } = useBalances()
  const { dpiStreamingFee } = useStreamingFee()
  const { dpiTotalSupply } = useTokenSupply()
  const { dpiSetComponents: setComponents } = useSetComponents()

  const token: ProductToken = {
    ...DefiPulseIndex,
    fees: dpiStreamingFee ? { streamingFee: dpiStreamingFee } : undefined,
  }
  const tokenDataProps: TokenDataProps = {
    prices: prices,
    hourlyPrices: hourlyPrices,
    latestPrice: latestPrice,
    latestMarketCap: latestMarketCap,
    latestVolume: latestVolume,
    token: token,
    components: components,
    setComponents: setComponents,
    balance: dpiBalance,
    currentSupply: dpiTotalSupply,
  }

  const [, setReferral] = useLocalStorage('referral', '')

  const history = useHistory()
  const params = new URLSearchParams(history.location.search)
  const value = params.get('referral')
  useEffect(() => {
    if (value) setReferral(value)
  }, [value, setReferral])

  return (
    <ProductDataUI tokenDataProps={tokenDataProps}>
      <strong>The DeFi Pulse Index</strong> is a capitalization-weighted index
      that tracks the performance of decentralized financial assets across the
      market.
      <h2>Objective</h2>
      The DeFi Pulse Index is a digital asset index designed to track tokens’
      performance within the Decentralized Finance industry. The index is
      weighted based on the value of each token’s circulating supply. The DeFi
      Pulse Index aims to track projects in Decentralized Finance that have
      significant usage and show a commitment to ongoing maintenance and
      development.
      <ExternalLink href='https://pulse.inc' target='_blank'>
        <h4>View the official methodology here.</h4>
      </ExternalLink>
      <h2>Token Inclusion Criteria</h2>
      The DeFi Pulse Index has a collection of criteria composed of four
      dimensions. Two dimensions are used to evaluate the token’s
      characteristics, one dimension is used to assess the project’s
      characteristics, and one is used to evaluate the protocol’s
      characteristics. The inclusion criteria are the basis to select what
      tokens will be included in the index.
      <h4>Token’s Descriptive Characteristics</h4>
      <ul>
        <li>The token must be available on the Ethereum blockchain.</li>
        <li>
          The token must be associated with a decentralized finance protocol or
          dapp listed on DeFi Pulse.
        </li>
        <li>
          The token must not be considered a security by the corresponding
          authorities across different jurisdictions.
        </li>
        <li>
          The token must be a bearer instrument. None of the following will be
          included in the index:Wrapped tokens. Tokenized derivatives. Synthetic
          assets. Tokens that are tied to physical assets. Tokens that represent
          claims on other tokens.
        </li>
      </ul>
      <h4>Token’s Supply Characteristics</h4>
      It must be possible to reasonably predict the token’s supply over the next
      five years. At least 7.5% of the five year supply must be currently
      circulating. The token’s economics must not have locking, minting or other
      patterns that would significantly disadvantage passive holders.
      <h4>Project’s Traction Characteristics</h4>
      <ul>
        <li>
          The project must be widely considered to be building a useful protocol
          or product.Projects focused on competitive trading/holding, having
          Ponzi characteristics, or projects that exist primarily for
          entertainment, will not be included.
        </li>
        <li>The project’s protocol must have significant usage.</li>
        <li>
          The protocol or product must have been launched at least 180 days
          before being able to qualify to be included in the index.
        </li>
        <li>The protocol or project must not be insolvent.</li>
      </ul>
      <h4>Protocol’s User Safety Characteristics</h4>
      <ul>
        <li>
          Security professionals must have reviewed the protocol to determine
          that security best practices have been followed to maintain user
          assets safe under different circumstances.Alternatively, the protocol
          must have been operating long enough to create a consensus about its
          safety in the decentralized finance community.
        </li>
        <li>
          In the event of a safety incident, the team must have responded
          promptly and addressed the incident responsibly in the aftermath,
          providing users of the protocol with a reliable solution and the
          decentralized finance community with adequate documentation to provide
          transparency about the incident.
        </li>
        <li>
          The selected tokens must have sufficient liquidity across a variety of
          trading platforms.
        </li>
      </ul>
      <h2>Index Calculations</h2>
      <StyledDpiIndexCalculationImage src={DpiIndexCalculationImage} />
      The Index value is the spot value of the index.
      <ul>
        <li>
          <strong>Circulating Supply</strong> is the number of tokens
          circulating the last time circulating supply was determined. The first
          circulating supply was determined on September 8, 2020, using
          CoinGecko as a reference source.
        </li>

        <li>
          <strong>Price</strong> is the market price of the token in USD.
        </li>

        <li>
          <strong>Index Divisor</strong> is a constant that is adjusted on each
          rebalance. As of September 31, 2020, the Divisor was
          <strong>44679560.64</strong>.
        </li>
      </ul>
      <h2>Index Maintenance</h2>
      The index is maintained monthly in two phases:
      <h4>Determination Phase</h4>
      The determination phase takes place during the third week of the month. It
      is the phase when the changes needed for the next reconstitution are
      determined.
      <ul>
        <li>
          <strong>Circulating Supply Determination:</strong> The DeFi Pulse
          Index currently references CoinGecko’s circulating supply number. The
          Circulating Supply is determined during the third week of the month
          and published before the monthly reconstitution.
        </li>
        <li>
          <strong>Additions and deletions:</strong> The tokens being added and
          deleted from the index calculation are determined during the third
          week of the month and published before monthly reconstitution.
        </li>
        <li>
          <strong>Weighting:</strong> Any token that has a weight greater than
          25% during the determination phase will have its weight capped at 25%.
          Any excess weight will be redistributed to the remaining components of
          the DeFi Pulse Index on a weighted basis. This same process will be
          repeated for every token exceeding the 25% allocation cap.
          reconstitution.
        </li>
      </ul>
      <h4>Reconstitution Phase</h4>
      The index components are adjusted, added and deleted as per the
      instructions published after the end of the determination phase. New index
      weights, additions and deletions are incorporated into the index during
      the monthly reconstitution, which will take place on the first business
      day of the month. As assets tracked by the index grow, the reconstitution
      window will expand to more than one day to lower the reconstitution’s
      market impact.
    </ProductDataUI>
  )
}

const StyledDpiIndexCalculationImage = styled.img`
  margin-bottom: 20px;
  width: 100%;
`

export default DpiProductPage

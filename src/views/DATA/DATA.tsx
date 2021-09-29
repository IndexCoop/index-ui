import React, { useEffect } from 'react'
import useDataTokenMarketData from 'hooks/useDataTokenMarketData'
import useDataComponents from 'hooks/useDataComponents'
import useBalances from 'hooks/useBalances'
import useTokenSupply from 'hooks/useTokenSupply'
import { DataIndex } from 'constants/productTokens'
import ProductDataUI, {
  TokenDataProps,
} from 'components/ProductPage/ProductDataUI'

import dataEsotericMath from 'assets/data-esoteric-math.png'

const DataProductPage = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  const { latestPrice, prices, hourlyPrices, latestMarketCap, latestVolume } =
    useDataTokenMarketData()
  const { components } = useDataComponents()
  const { dataBalance, dataTotalSupply: dataTotalSupplyFromBalances } = useBalances()
  const { dataTotalSupply } = useTokenSupply();

  const tokenDataProps: TokenDataProps = {
    prices: prices,
    hourlyPrices: hourlyPrices,
    latestPrice: latestPrice,
    latestMarketCap: latestMarketCap,
    latestVolume: latestVolume,
    token: DataIndex,
    components: components,
    balance: dataBalance,
    currentSupply: dataTotalSupply ?? dataTotalSupplyFromBalances,
  }

  return (
    <ProductDataUI tokenDataProps={tokenDataProps}>
      <p>
        <h2>What is the Data Economy?</h2>
        <h3>
          The Data Economy is an ecosystem of data-based products and services.
        </h3>
        <p>
          Whereas Decentralized Finance (aka DeFi) is disrupting traditional
          banking and financial services, the Data Economy is disrupting the
          data monopolies built in Big Tech over the past 20 years.
        </p>
        <h2>About the DATA Index</h2>
        <p>
          The Data Economy Index (DATA) is a digital asset index capturing the
          growth of data economies with significant economic activity.{' '}
        </p>
        <p>
          The DATA index is **data centric and chain agnostic.** DATA includes
          tokens from **any** blockchain that provides data-based products or
          services.
        </p>
        <h2>Token Inclusion Criteria</h2>
        Selection of the DATA tokens is based upon the following criteria:
        <ul>
          <li>
            <strong>Data-based Protocol:</strong> The protocol provides
            data-based services or products.
          </li>
          <li>
            <strong>Ethereum Token:</strong> The token must be available on the
            Ethereum blockchain. This will be revised if the Set Protocol
            infrastructure becomes multi-chain.
          </li>
          <li>
            <strong>Organic Network Activity or Usage:</strong> Protocol must
            have organic network activity or usage. On-chain transaction volume,
            Total Value Locked (TVL), and/or revenue paid to service providers
            are all examples of metrics that can be used to demonstrate organic
            network activity.
          </li>
          <li>
            <strong>Market Capitalization:</strong> Circulating market
            capitalization must be over $100m.
          </li>
          <li>
            <strong>Decentralized Exchange (DEX) Liquidity:</strong> Protocol
            token must have sufficient DEX liquidity to support inclusion. If a
            token has insufficient liquidity, it will be removed from the index
            during the determination phase.
          </li>
          <li>
            <strong>History:</strong> Protocol must have at least 3 months
            history of operation and its token must have at least 3 months of
            price and liquidity history.
          </li>
          <li>
            <strong>Security:</strong> An independent security audit should have
            been performed on the protocol and results reviewed by the product
            methodologist. In the case that no audit has been performed, the
            methodologist applies subjective judgement of the protocol based on
            assessment of the criteria above and communications with the team.
          </li>
          <li>
            <strong>Safety:</strong> In the event of a security issue the
            methodologist will work with the project team to understand the
            issue and any effects to DATA holdings. The team is expected to
            provide users of the protocol with a reliable solution and adequate
            documentation to ensure transparency about any incidents.
          </li>
        </ul>
        <h2>Index Weight Calculation</h2>
        <p>
          DATA will use circulating market capitalization to determine the
          weight of each token included in the index. The weight of each token
          within the index will be as follows:
        </p>
        <img src={dataEsotericMath} alt="Data esoteric math" />
        <p>
          The Data Economy Index caps each token’s respective weight at 25%.
          Excess weight for a given token will be redistributed to the remaining
          components of the Data Economy Index on a weighted basis. This same
          process will be repeated for every token exceeding the 25% allocation
          cap.
        </p>
        <h2>Index Maintenance</h2>
        The index is maintained quarterly in two phases:
        <ul>
          <li>
            During the determination phase, the tokens being added and deleted
            from the index calculation are determined during the final week of
            the quarter and published before quarterly rebalancing.
          </li>
          <li>
            Following publication of the determination phase outcome, the index
            composition will change to the new weights during the first week of
            the following quarter.
          </li>
        </ul>
      </p>
    </ProductDataUI>
  )
}

export default DataProductPage

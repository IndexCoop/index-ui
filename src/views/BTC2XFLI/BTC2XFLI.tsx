import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import ExternalLink from 'components/ExternalLink'

import useBtc2xFliTokenSupplyCap from 'hooks/useBtc2xFliTokenSupplyCap'
import useBtc2xFliTokenMarketData from 'hooks/useBtc2xFliTokenMarketData'
import useBtc2xFliIndexPortfolioData from 'hooks/useBtc2xFliIndexPortfolioData'
import useBalances from 'hooks/useBalances'
import {
  Bitcoin2xFlexibleLeverageIndex,
  ProductToken,
} from 'constants/productTokens'
import ProductDataUI, {
  TokenDataProps,
} from 'components/ProductPage/ProductDataUI'
import useWallet from 'hooks/useWallet'
import BigNumber from 'utils/bignumber'
import useStreamingFee from 'hooks/useStreamingFee'
import useTokenSupply from 'hooks/useTokenSupply'

const Btc2xFliProductPage = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  const { prices, hourlyPrices, latestPrice, latestVolume, latestMarketCap } =
    useBtc2xFliTokenMarketData()
  const { components } = useBtc2xFliIndexPortfolioData()
  const { btcfliBalance } = useBalances()
  const { btcfliSupplyCap } = useBtc2xFliTokenSupplyCap()
  const { btc2xFliStreamingFee } = useStreamingFee()
  const { btc2xfliTotalSupply } = useTokenSupply()

  const token: ProductToken = {
    ...Bitcoin2xFlexibleLeverageIndex,
    fees: btc2xFliStreamingFee
      ? { streamingFee: btc2xFliStreamingFee }
      : undefined,
  }
  const tokenDataProps: TokenDataProps = {
    prices: prices,
    hourlyPrices: hourlyPrices,
    latestPrice: latestPrice,
    latestMarketCap: latestMarketCap,
    latestVolume: latestVolume,
    token: token,
    components: components,
    balance: btcfliBalance,
    supplyCap: btcfliSupplyCap,
    currentSupply: btc2xfliTotalSupply,
  }
  const { account } = useWallet()

  const isApproachingSupplyCap = btc2xfliTotalSupply
    ?.div(btcfliSupplyCap as BigNumber)
    .isGreaterThan(0.95)

  useEffect(() => {
    if (account && isApproachingSupplyCap) {
      toast.error(
        "BTC2x-FLI has reached it's supply cap. Beware this product may be trading at a significant premium to it's Net Asset Value.",
        {
          toastId: 'btcfli-supply-cap-warning',
          position: 'top-right',
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      )
    }

    return () => {
      toast.dismiss('btcfli-supply-cap-warning')
    }
  }, [account, isApproachingSupplyCap])

  return (
    <ProductDataUI tokenDataProps={tokenDataProps}>
      <strong>The Bitcoin Flexible Leverage Index</strong> lets you leverage a
      collateralized debt position in a safe and efficient way, by abstracting
      its management into a simple index. It enables market participants to take
      on leverage while minimizing the transaction costs and risks associated
      with maintaining collateralized debt.
      <h2>Objective</h2>
      The Bitcoin Flexible Leverage Index (BTC2X-FLI) makes leverage effortless.
      The end user does not have to worry about:
      <ul>
        <li>
          Monitoring their leveraged loan 24/7, having to always be ready to
          act.
        </li>

        <li>
          High fees, transactions not being included fast enough or the relative
          UIs being unresponsive during times of high volatility.
        </li>

        <li>
          Paying for overpriced stablecoins to deleverage on time or panic
          trading to save their positions.
        </li>
      </ul>
      BTC2X-FLI has several key advantages over Legacy Leveraged Tokens:
      <ul>
        <li>Zero slippage via composable entry and exit.</li>

        <li>
          Unique Index algorithm reduces rebalancing needs by an order of
          magnitude.
        </li>

        <li>
          Emergency deleveraging possible during Black Swan events for
          additional fund safety.
        </li>
      </ul>
      <ExternalLink
        href='https://pulse.inc/flexible-leverage-index'
        target='_blank'
      >
        <h4>View the methodology here.</h4>
      </ExternalLink>
      <h2>Initial Parameters:</h2>
      <ul>
        <li>Underlying Asset: WBTC</li>
        <li>Target Leverage Ratio: 2</li>
        <li>DeFi Lending Protocol: Compound</li>
        <li>Maximum Leverage Ratio: 2.2</li>
        <li>Minimum Leverage Ratio: 1.8</li>
        <li>Recentering Speed: 10%</li>
      </ul>
      <h2>Definitions:</h2>
      <ul>
        <li>
          Borrow Rate — the cost to borrow the asset at the DeFi Lending
          Protocol over the most recent epoch.
        </li>
        <li>Epoch Length — the time between rebalances.</li>
        <li>
          Target Leverage Ratio (TLR) — the long term target for the value of
          the assets held by the index divided by the value of the debt held by
          the index.
        </li>
        <li>
          Current Leverage Ratio (CLR) — the value of the asset currently held
          by the index divided by the current value of the debt held by the
          index.
        </li>
        <li>
          Maximum Leverage Ratio (MAXLR) — the highest leverage ratio the index
          will ever have after a rebalance.
        </li>
        <li>
          Re-centering Speed (RS) — the rate at which the Current Leverage Ratio
          is adjusted each period to return to the Target Leverage Ratio, when
          the index is not being adjusted back to the Maximum Leverage Ratio or
          the Minimum Leverage Ratio.
        </li>
      </ul>
      <h3>Index Price:</h3>
      <i>
        FLIt = FLIt-1 * (1 + ((Pricet/Pricet-1–1) * CLRt-1 — (BorrowRatet *
        (CLRt-1 -1)/CLRt-1)))
      </i>
      <h3>Calculation of the new Current Lever Ratio for the period:</h3>
      <i>CLRt+1 = max(MINLR, min(MAXLR, CLRt * (1 - RS) + TLR * RS))</i>
      <h2>Fees:</h2>
      Flexible Leverage Index has a streaming fee of 1.95% (195 basis points)
      and a 0.1% (10 basis points) mint/redeem fee. The revenue generated from
      the streaming fee is split 40% to DeFi Pulse and 60% to Index Coop.
    </ProductDataUI>
  )
}

export default Btc2xFliProductPage

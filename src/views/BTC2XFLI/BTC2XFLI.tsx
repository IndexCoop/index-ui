import React, { useEffect } from 'react'

import { toast } from 'react-toastify'

import ProductDataUI, {
  TokenDataProps,
} from 'components/ProductPage/ProductDataUI'
import {
  Bitcoin2xFlexibleLeverageIndex,
  ProductToken,
} from 'constants/productTokens'
import useBalances from 'hooks/useBalances'
import useBtc2xFliTokenMarketData from 'hooks/useBtc2xFliTokenMarketData'
import useBtc2xFliTokenSupplyCap from 'hooks/useBtc2xFliTokenSupplyCap'
import useSetComponents from 'hooks/useSetComponents'
import useStreamingFee from 'hooks/useStreamingFee'
import useTokenSupply from 'hooks/useTokenSupply'
import useWallet from 'hooks/useWallet'
import BigNumber from 'utils/bignumber'

const Btc2xFliProductPage = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  const { prices, hourlyPrices, latestPrice, latestVolume, latestMarketCap } =
    useBtc2xFliTokenMarketData()
  const { btc2xfliComponents: components } = useSetComponents()
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

  return <ProductDataUI tokenDataProps={tokenDataProps} />
}

export default Btc2xFliProductPage

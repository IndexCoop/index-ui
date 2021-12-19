import React, { useEffect } from 'react'

import { toast } from 'react-toastify'

import ProductDataUI, {
  TokenDataProps,
} from 'components/ProductPage/ProductDataUI'
import {
  Ethereum2xFlexibleLeverageIndex,
  ProductToken,
} from 'constants/productTokens'
import useBalances from 'hooks/useBalances'
import useEth2xFliTokenMarketData from 'hooks/useEth2xFliTokenMarketData'
import useEth2xFliTokenSupplyCap from 'hooks/useEth2xFliTokenSupplyCap'
import useSetComponents from 'hooks/useSetComponents'
import useStreamingFee from 'hooks/useStreamingFee'
import useTokenSupply from 'hooks/useTokenSupply'
import useWallet from 'hooks/useWallet'
import BigNumber from 'utils/bignumber'

const Eth2xFliProductPage = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  const { prices, hourlyPrices, latestPrice, latestMarketCap, latestVolume } =
    useEth2xFliTokenMarketData()
  const { eth2xfliComponents: components } = useSetComponents()
  const { ethfliBalance } = useBalances()
  const { ethfliSupplyCap } = useEth2xFliTokenSupplyCap()
  const { eth2xFliStreamingFee } = useStreamingFee()
  const { eth2xfliTotalSupply } = useTokenSupply()

  const token: ProductToken = {
    ...Ethereum2xFlexibleLeverageIndex,
    fees: eth2xFliStreamingFee
      ? { streamingFee: eth2xFliStreamingFee }
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
    balance: ethfliBalance,
    supplyCap: ethfliSupplyCap,
    currentSupply: eth2xfliTotalSupply,
  }
  const { account } = useWallet()

  const isApproachingSupplyCap = eth2xfliTotalSupply
    ?.div(ethfliSupplyCap as BigNumber)
    .isGreaterThan(0.95)

  useEffect(() => {
    if (account && isApproachingSupplyCap) {
      toast.error(
        "ETH2x-FLI has reached it's supply cap. Beware this product may be trading at a significant premium to it's Net Asset Value.",
        {
          toastId: 'ethfli-supply-cap-warning',
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
      toast.dismiss('ethfli-supply-cap-warning')
    }
  }, [account, isApproachingSupplyCap])

  return <ProductDataUI tokenDataProps={tokenDataProps} />
}

export default Eth2xFliProductPage

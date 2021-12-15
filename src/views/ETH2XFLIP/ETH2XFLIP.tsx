import React, { useEffect } from 'react'

import { toast } from 'react-toastify'

import ProductDataUI, {
  TokenDataProps,
} from 'components/ProductPage/ProductDataUI'
import { Ethereum2xFLIP, ProductToken } from 'constants/productTokens'
import useBalances from 'hooks/useBalances'
import useEth2xFLIPTokenMarketData from 'hooks/useEth2xFLIPTokenMarketData'
import useEth2xFLIPTokenSupplyCap from 'hooks/useEth2xFLIPTokenSupplyCap'
import useSetComponents from 'hooks/useSetComponents'
import useStreamingFee from 'hooks/useStreamingFee'
import useTokenSupply from 'hooks/useTokenSupply'
import useWallet from 'hooks/useWallet'
import BigNumber from 'utils/bignumber'

const Eth2xFLIPProductPage = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  const { prices, hourlyPrices, latestPrice, latestMarketCap, latestVolume } =
    useEth2xFLIPTokenMarketData()
  const { eth2xflipComponents: components } = useSetComponents()
  const { ethflipBalance } = useBalances()
  const { ethflipSupplyCap } = useEth2xFLIPTokenSupplyCap()
  const { eth2xFLIPStreamingFee } = useStreamingFee()
  const { eth2xflipTotalSupply } = useTokenSupply()

  const token: ProductToken = {
    ...Ethereum2xFLIP,
    fees: eth2xFLIPStreamingFee
      ? { streamingFee: eth2xFLIPStreamingFee }
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
    balance: ethflipBalance,
    supplyCap: ethflipSupplyCap,
    currentSupply: eth2xflipTotalSupply,
  }
  const { account } = useWallet()

  const isApproachingSupplyCap = eth2xflipTotalSupply
    ?.div(ethflipSupplyCap as BigNumber)
    .isGreaterThan(0.95)

  useEffect(() => {
    if (account && isApproachingSupplyCap) {
      toast.error(
        "ETH2x-FLI-P has reached it's supply cap. Beware this product may be trading at a significant premium to it's Net Asset Value.",
        {
          toastId: 'ethfli-p-supply-cap-warning',
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
      toast.dismiss('ethfli-p-supply-cap-warning')
    }
  }, [account, isApproachingSupplyCap])

  return <ProductDataUI tokenDataProps={tokenDataProps} />
}

export default Eth2xFLIPProductPage

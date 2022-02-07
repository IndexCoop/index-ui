import React, { useEffect } from 'react'

import { toast } from 'react-toastify'

import ProductDataUI, {
  TokenDataProps,
} from 'components/ProductPage/ProductDataUI'
import { IEthereumFLIP, ProductToken } from 'constants/productTokens'
import useBalances from 'hooks/useBalances'
import useIEthFLIPTokenMarketData from 'hooks/useIEthFLIPTokenMarketData'
import useIEthFLIPTokenSupplyCap from 'hooks/useIEthFLIPTokenSupplyCap'
import useSetComponents from 'hooks/useSetComponents'
import useStreamingFee from 'hooks/useStreamingFee'
import useTokenSupply from 'hooks/useTokenSupply'
import useWallet from 'hooks/useWallet'
import BigNumber from 'utils/bignumber'

const IETHFLIPProductPage = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  const { prices, hourlyPrices, latestPrice, latestMarketCap, latestVolume } =
    useIEthFLIPTokenMarketData()
  const { iEthFlipComponents: components } = useSetComponents()
  const { iethFlipBalance } = useBalances()
  const { iethflipSupplyCap } = useIEthFLIPTokenSupplyCap()
  const { iethFLIPStreamingFee } = useStreamingFee()
  const { iethflipTotalSupply } = useTokenSupply()

  const token: ProductToken = {
    ...IEthereumFLIP,
    fees: iethFLIPStreamingFee
      ? { streamingFee: iethFLIPStreamingFee }
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
    balance: iethFlipBalance,
    supplyCap: iethflipSupplyCap,
    currentSupply: iethflipTotalSupply,
  }
  const { account } = useWallet()

  const isApproachingSupplyCap = iethflipTotalSupply
    ?.div(iethflipSupplyCap as BigNumber)
    .isGreaterThan(0.95)

  useEffect(() => {
    if (account && isApproachingSupplyCap) {
      toast.error(
        "iETH-FLI-P has reached it's supply cap. Beware this product may be trading at a significant premium to it's Net Asset Value.",
        {
          toastId: 'iethfli-p-supply-cap-warning',
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

export default IETHFLIPProductPage

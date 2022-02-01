import React, { useEffect } from 'react'

import { toast } from 'react-toastify'

import ProductDataUI, {
  TokenDataProps,
} from 'components/ProductPage/ProductDataUI'
import { IEthereum2xFLIP, ProductToken } from 'constants/productTokens'
import useBalances from 'hooks/useBalances'
import useIEth2xFLIPTokenMarketData from 'hooks/useIEth2xFLIPTokenMarketData'
import useIEth2xFLIPTokenSupplyCap from 'hooks/useIEth2xFLIPTokenSupplyCap'
import useSetComponents from 'hooks/useSetComponents'
import useStreamingFee from 'hooks/useStreamingFee'
import useTokenSupply from 'hooks/useTokenSupply'
import useWallet from 'hooks/useWallet'
import BigNumber from 'utils/bignumber'

const IETH2XFLIPProductPage = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  const { prices, hourlyPrices, latestPrice, latestMarketCap, latestVolume } =
    useIEth2xFLIPTokenMarketData()
  const { iEth2xFlipComponents: components } = useSetComponents()
  const { iethFlipBalance } = useBalances()
  const { iethflipSupplyCap } = useIEth2xFLIPTokenSupplyCap()
  const { ieth2xFLIPStreamingFee } = useStreamingFee()
  const { ieth2xflipTotalSupply } = useTokenSupply()

  const token: ProductToken = {
    ...IEthereum2xFLIP,
    fees: ieth2xFLIPStreamingFee
      ? { streamingFee: ieth2xFLIPStreamingFee }
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
    currentSupply: ieth2xflipTotalSupply,
  }
  const { account } = useWallet()

  const isApproachingSupplyCap = ieth2xflipTotalSupply
    ?.div(iethflipSupplyCap as BigNumber)
    .isGreaterThan(0.95)

  useEffect(() => {
    if (account && isApproachingSupplyCap) {
      toast.error(
        "iETH2x-FLI-P has reached it's supply cap. Beware this product may be trading at a significant premium to it's Net Asset Value.",
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

export default IETH2XFLIPProductPage

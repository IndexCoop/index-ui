import React, { useEffect } from 'react'

import { toast } from 'react-toastify'

import ProductDataUI, {
  TokenDataProps,
} from 'components/ProductPage/ProductDataUI'
import { IMaticFLIP, ProductToken } from 'constants/productTokens'
import useBalances from 'hooks/useBalances'
import useIMaticFLIPTokenMarketData from 'hooks/useIMaticFLIPTokenMarketData'
import useIMaticFLIPTokenSupplyCap from 'hooks/useIMaticFLIPTokenSupplyCap'
import useSetComponents from 'hooks/useSetComponents'
import useStreamingFee from 'hooks/useStreamingFee'
import useTokenSupply from 'hooks/useTokenSupply'
import useWallet from 'hooks/useWallet'
import BigNumber from 'utils/bignumber'

const IMaticFLIProductPage = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  const { prices, hourlyPrices, latestPrice, latestMarketCap, latestVolume } =
    useIMaticFLIPTokenMarketData()
  const { iMaticFlipComponents: components } = useSetComponents()
  const { imaticFlipBalancePolygon } = useBalances()
  const { imaticflipSupplyCap } = useIMaticFLIPTokenSupplyCap()
  const { imaticFLIPStreamingFee } = useStreamingFee()
  const { imaticflipTotalSupply } = useTokenSupply()

  const token: ProductToken = {
    ...IMaticFLIP,
    fees: imaticFLIPStreamingFee
      ? { streamingFee: imaticFLIPStreamingFee }
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
    balance: imaticFlipBalancePolygon,
    supplyCap: imaticflipSupplyCap,
    currentSupply: imaticflipTotalSupply,
  }
  const { account } = useWallet()

  const isApproachingSupplyCap = imaticflipTotalSupply
    ?.div(imaticflipSupplyCap as BigNumber)
    .isGreaterThan(0.95)

  useEffect(() => {
    if (account && isApproachingSupplyCap) {
      toast.error(
        "iMatic-FLI-P has reached it's supply cap. Beware this product may be trading at a significant premium to it's Net Asset Value.",
        {
          toastId: 'imatic-fli-p-supply-cap-warning',
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

export default IMaticFLIProductPage

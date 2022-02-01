import React, { useEffect } from 'react'

import { toast } from 'react-toastify'

import ProductDataUI, {
  TokenDataProps,
} from 'components/ProductPage/ProductDataUI'
import { IMatic2xFLI, ProductToken } from 'constants/productTokens'
import useBalances from 'hooks/useBalances'
import useIMatic2xFLITokenMarketData from 'hooks/useIMatic2xFLITokenMarketData'
import useIMatic2xFLITokenSupplyCap from 'hooks/useIMatic2xFLITokenSupplyCap'
import useSetComponents from 'hooks/useSetComponents'
import useStreamingFee from 'hooks/useStreamingFee'
import useTokenSupply from 'hooks/useTokenSupply'
import useWallet from 'hooks/useWallet'
import BigNumber from 'utils/bignumber'

const IMatic2xFLIProductPage = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  const { prices, hourlyPrices, latestPrice, latestMarketCap, latestVolume } =
    useIMatic2xFLITokenMarketData()
  const { iMatic2xFliComponents: components } = useSetComponents()
  const { imaticFliBalancePolygon } = useBalances()
  const { imaticfliSupplyCap } = useIMatic2xFLITokenSupplyCap()
  const { imatic2xFLIStreamingFee } = useStreamingFee()
  const { imatic2xfliTotalSupply } = useTokenSupply()

  const token: ProductToken = {
    ...IMatic2xFLI,
    fees: imatic2xFLIStreamingFee
      ? { streamingFee: imatic2xFLIStreamingFee }
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
    balance: imaticFliBalancePolygon,
    supplyCap: imaticfliSupplyCap,
    currentSupply: imatic2xfliTotalSupply,
  }
  const { account } = useWallet()

  const isApproachingSupplyCap = imatic2xfliTotalSupply
    ?.div(imaticfliSupplyCap as BigNumber)
    .isGreaterThan(0.95)

  useEffect(() => {
    if (account && isApproachingSupplyCap) {
      toast.error(
        "iMatic2x-FLI has reached it's supply cap. Beware this product may be trading at a significant premium to it's Net Asset Value.",
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

export default IMatic2xFLIProductPage

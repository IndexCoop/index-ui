import { useEffect } from 'react'

import { toast } from 'react-toastify'

import ProductDataUI, {
  TokenDataProps,
} from 'components/ProductPage/ProductDataUI'
import { Matic2xFLI, ProductToken } from 'constants/productTokens'
import useBalances from 'hooks/useBalances'
import useMatic2xFLITokenMarketData from 'hooks/useMatic2xFLITokenMarketData'
import useMatic2xFLITokenSupplyCap from 'hooks/useMatic2xFLITokenSupplyCap'
import useSetComponents from 'hooks/useSetComponents'
import useStreamingFee from 'hooks/useStreamingFee'
import useTokenSupply from 'hooks/useTokenSupply'
import useWallet from 'hooks/useWallet'
import BigNumber from 'utils/bignumber'

const Matic2xFLIProductPage = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  const { prices, hourlyPrices, latestPrice, latestMarketCap, latestVolume } =
    useMatic2xFLITokenMarketData()
  const { matic2xFliComponents: components } = useSetComponents()
  const { maticFliBalancePolygon } = useBalances()
  const { maticfliSupplyCap } = useMatic2xFLITokenSupplyCap()
  const { matic2xFLIStreamingFee } = useStreamingFee()
  const { matic2xfliTotalSupply } = useTokenSupply()

  const token: ProductToken = {
    ...Matic2xFLI,
    fees: matic2xFLIStreamingFee
      ? { streamingFee: matic2xFLIStreamingFee }
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
    balance: maticFliBalancePolygon,
    supplyCap: maticfliSupplyCap,
    currentSupply: matic2xfliTotalSupply,
  }
  const { account } = useWallet()

  const isApproachingSupplyCap = matic2xfliTotalSupply
    ?.div(maticfliSupplyCap as BigNumber)
    .isGreaterThan(0.95)

  useEffect(() => {
    if (account && isApproachingSupplyCap) {
      toast.error(
        "Matic2x-FLI has reached it's supply cap. Beware this product may be trading at a significant premium to it's Net Asset Value.",
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

export default Matic2xFLIProductPage

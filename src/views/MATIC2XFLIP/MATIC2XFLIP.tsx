import { useEffect } from 'react'

import { toast } from 'react-toastify'

import ProductDataUI, {
  TokenDataProps,
} from 'components/ProductPage/ProductDataUI'
import { Matic2xFLIP, ProductToken } from 'constants/productTokens'
import useBalances from 'hooks/useBalances'
import useMatic2xFLIPTokenMarketData from 'hooks/useMatic2xFLIPTokenMarketData'
import useMatic2xFLIPTokenSupplyCap from 'hooks/useMatic2xFLIPTokenSupplyCap'
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
    useMatic2xFLIPTokenMarketData()
  const { matic2xFlipComponents: components } = useSetComponents()
  const { maticFlipBalancePolygon } = useBalances()
  const { maticflipSupplyCap } = useMatic2xFLIPTokenSupplyCap()
  const { matic2xFLIPStreamingFee } = useStreamingFee()
  const { matic2xflipTotalSupply } = useTokenSupply()

  const token: ProductToken = {
    ...Matic2xFLIP,
    fees: matic2xFLIPStreamingFee
      ? { streamingFee: matic2xFLIPStreamingFee }
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
    balance: maticFlipBalancePolygon,
    supplyCap: maticflipSupplyCap,
    currentSupply: matic2xflipTotalSupply,
  }
  const { account } = useWallet()

  const isApproachingSupplyCap = matic2xflipTotalSupply
    ?.div(maticflipSupplyCap as BigNumber)
    .isGreaterThan(0.95)

  useEffect(() => {
    if (account && isApproachingSupplyCap) {
      toast.error(
        "Matic2x-FLI has reached it's supply cap. Beware this product may be trading at a significant premium to it's Net Asset Value.",
        {
          toastId: 'maticfli-p-supply-cap-warning',
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

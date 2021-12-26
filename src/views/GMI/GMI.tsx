import { useEffect } from 'react'

import ProductDataUI, {
  TokenDataProps,
} from 'components/ProductPage/ProductDataUI'
import { GmiIndex, ProductToken } from 'constants/productTokens'
import useBalances from 'hooks/useBalances'
import useGmiTokenMarketData from 'hooks/useGmiTokenMarketData'
import useSetComponents from 'hooks/useSetComponents'
import useStreamingFee from 'hooks/useStreamingFee'
import useTokenSupply from 'hooks/useTokenSupply'

const GMIProductPage = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  const { prices, hourlyPrices, latestPrice, latestMarketCap, latestVolume } =
    useGmiTokenMarketData()
  const { gmiComponents: components } = useSetComponents()
  const { gmiBalance } = useBalances()
  const { gmiStreamingFee } = useStreamingFee()
  const { gmiTotalSupply } = useTokenSupply()

  const token: ProductToken = {
    ...GmiIndex,
    fees: gmiStreamingFee ? { streamingFee: gmiStreamingFee } : undefined,
  }
  const tokenDataProps: TokenDataProps = {
    prices: prices,
    hourlyPrices: hourlyPrices,
    latestPrice: latestPrice,
    latestMarketCap: latestMarketCap,
    latestVolume: latestVolume,
    token: token,
    components: components,
    balance: gmiBalance,
    currentSupply: gmiTotalSupply,
  }

  return <ProductDataUI tokenDataProps={tokenDataProps} />
}

export default GMIProductPage

import React, { useEffect } from 'react'
import useMviTokenMarketData from 'hooks/useMviTokenMarketData'
import useBalances from 'hooks/useBalances'
import { MetaverseIndex, ProductToken } from 'constants/productTokens'
import ProductDataUI, {
  TokenDataProps,
} from 'components/ProductPage/ProductDataUI'
import useStreamingFee from 'hooks/useStreamingFee'
import useTokenSupply from 'hooks/useTokenSupply'
import useSetComponents from 'hooks/useSetComponents'

const MviProductPage = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  const { latestPrice, prices, hourlyPrices, latestMarketCap, latestVolume } =
    useMviTokenMarketData()
  const { mviComponents: components } = useSetComponents()
  const { mviBalance } = useBalances()
  const { mviStreamingFee } = useStreamingFee()
  const { mviTotalSupply } = useTokenSupply()

  const token: ProductToken = {
    ...MetaverseIndex,
    fees: mviStreamingFee ? { streamingFee: mviStreamingFee } : undefined,
  }
  const tokenDataProps: TokenDataProps = {
    prices: prices,
    hourlyPrices: hourlyPrices,
    latestPrice: latestPrice,
    latestMarketCap: latestMarketCap,
    latestVolume: latestVolume,
    token: token,
    components: components,
    balance: mviBalance,
    currentSupply: mviTotalSupply,
  }

  return <ProductDataUI tokenDataProps={tokenDataProps} />
}

export default MviProductPage

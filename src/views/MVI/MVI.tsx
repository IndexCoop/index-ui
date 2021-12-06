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
import useWallet from 'hooks/useWallet'
import { mviTokenPolygonAddress } from 'constants/ethContractAddresses'
import BigNumber from 'utils/bignumber'

const MviProductPage = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  const { latestPrice, prices, hourlyPrices, latestMarketCap, latestVolume } =
    useMviTokenMarketData()
  const { chainId } = useWallet()
  const { mviComponents: components } = useSetComponents()
  const { mviBalance, mviBalancePolygon } = useBalances()
  const { mviStreamingFee } = useStreamingFee()
  const { mviTotalSupply } = useTokenSupply()

  const token: ProductToken = {
    ...MetaverseIndex,
    fees: mviStreamingFee ? { streamingFee: mviStreamingFee } : undefined,
  }

  const getTokenBalance = () => {
    if (chainId) {
      if (chainId === 1) return mviBalance
      else if (chainId === 137) return mviBalancePolygon
    }
    return new BigNumber(0)
  }

  const tokenDataProps: TokenDataProps = {
    prices: prices,
    hourlyPrices: hourlyPrices,
    latestPrice: latestPrice,
    latestMarketCap: latestMarketCap,
    latestVolume: latestVolume,
    token: token,
    components: components,
    balance: getTokenBalance(),
    currentSupply: mviTotalSupply,
  }

  return <ProductDataUI tokenDataProps={tokenDataProps} />
}

export default MviProductPage

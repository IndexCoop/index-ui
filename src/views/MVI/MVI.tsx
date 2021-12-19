import React, { useEffect } from 'react'

import ProductDataUI, {
  TokenDataProps,
} from 'components/ProductPage/ProductDataUI'
import { mviTokenPolygonAddress } from 'constants/ethContractAddresses'
import { MetaverseIndex, ProductToken } from 'constants/productTokens'
import useBalances from 'hooks/useBalances'
import useMviTokenMarketData from 'hooks/useMviTokenMarketData'
import useSetComponents from 'hooks/useSetComponents'
import useStreamingFee from 'hooks/useStreamingFee'
import useTokenSupply from 'hooks/useTokenSupply'
import useWallet from 'hooks/useWallet'
import BigNumber from 'utils/bignumber'
import { MAINNET_CHAIN_DATA, POLYGON_CHAIN_DATA } from 'utils/connectors'

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
      if (chainId === MAINNET_CHAIN_DATA.chainId) return mviBalance
      else if (chainId === POLYGON_CHAIN_DATA.chainId) return mviBalancePolygon
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

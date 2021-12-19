import React, { useEffect } from 'react'

import styled from 'styled-components'

import ProductDataUI, {
  TokenDataProps,
} from 'components/ProductPage/ProductDataUI'
import { BedIndex, ProductToken } from 'constants/productTokens'
import useBalances from 'hooks/useBalances'
import useBedTokenMarketData from 'hooks/useBedTokenMarketData'
import useSetComponents from 'hooks/useSetComponents'
import useStreamingFee from 'hooks/useStreamingFee'
import useTokenSupply from 'hooks/useTokenSupply'

const BedProductPage = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  const { prices, hourlyPrices, latestPrice, latestMarketCap, latestVolume } =
    useBedTokenMarketData()
  const { bedComponents: components } = useSetComponents()
  const { bedBalance } = useBalances()
  const { bedStreamingFee } = useStreamingFee()
  const { bedTotalSupply } = useTokenSupply()

  const token: ProductToken = {
    ...BedIndex,
    fees: bedStreamingFee ? { streamingFee: bedStreamingFee } : undefined,
  }
  const tokenDataProps: TokenDataProps = {
    prices: prices,
    hourlyPrices: hourlyPrices,
    latestPrice: latestPrice,
    latestMarketCap: latestMarketCap,
    latestVolume: latestVolume,
    token: token,
    components: components,
    balance: bedBalance,
    currentSupply: bedTotalSupply,
  }

  return <ProductDataUI tokenDataProps={tokenDataProps} />
}

const StyledBedIndexCalculationImage = styled.img`
  margin-bottom: 20px;
  width: 100%;
`

export default BedProductPage

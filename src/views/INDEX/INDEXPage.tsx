import React, { useEffect } from 'react'

import ProductDataUI, {
  TokenDataProps,
} from 'components/ProductPage/ProductDataUI'
import { IndexToken } from 'constants/productTokens'
import useBalances from 'hooks/useBalances'
import useIndexTokenMarketData from 'hooks/useIndexTokenMarketData'

const DpiProductPage = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  const { prices, hourlyPrices, latestPrice, latestMarketCap, latestVolume } =
    useIndexTokenMarketData()
  const { indexBalance } = useBalances()
  const tokenDataProps: TokenDataProps = {
    prices: prices,
    hourlyPrices: hourlyPrices,
    latestPrice: latestPrice,
    latestMarketCap: latestMarketCap,
    latestVolume: latestVolume,
    token: IndexToken,
    components: undefined,
    balance: indexBalance,
  }

  return <ProductDataUI tokenDataProps={tokenDataProps} />
}

export default DpiProductPage

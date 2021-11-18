import React, { useEffect } from 'react'
import useDataTokenMarketData from 'hooks/useDataTokenMarketData'
import useBalances from 'hooks/useBalances'
import useTokenSupply from 'hooks/useTokenSupply'
import { DataIndex } from 'constants/productTokens'
import ProductDataUI, {
  TokenDataProps,
} from 'components/ProductPage/ProductDataUI'

import useSetComponents from 'hooks/useSetComponents'

const DataProductPage = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  const { latestPrice, prices, hourlyPrices, latestMarketCap, latestVolume } =
    useDataTokenMarketData()
  const { dataComponents: components } = useSetComponents()
  const { dataBalance } = useBalances()
  const { dataTotalSupply } = useTokenSupply()

  const tokenDataProps: TokenDataProps = {
    prices: prices,
    hourlyPrices: hourlyPrices,
    latestPrice: latestPrice,
    latestMarketCap: latestMarketCap,
    latestVolume: latestVolume,
    token: DataIndex,
    components: components,
    balance: dataBalance,
    currentSupply: dataTotalSupply,
  }

  return <ProductDataUI tokenDataProps={tokenDataProps} />
}

export default DataProductPage

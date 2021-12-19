import React, { useEffect } from 'react'

import ProductDataUI, {
  TokenDataProps,
} from 'components/ProductPage/ProductDataUI'
import { DataIndex } from 'constants/productTokens'
import useBalances from 'hooks/useBalances'
import useDataTokenMarketData from 'hooks/useDataTokenMarketData'
import useSetComponents from 'hooks/useSetComponents'
import useTokenSupply from 'hooks/useTokenSupply'

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

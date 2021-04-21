import { useContext } from 'react'

import { DpiTokenMarketDataContext } from 'contexts/DpiTokenMarketData'
import { CgiTokenMarketDataContext } from 'contexts/CgiTokenMarketData'
import { FliTokenMarketDataContext } from 'contexts/FliTokenMarketData'
import { MviTokenMarketDataContext } from 'contexts/MviTokenMarketData'

const useAllProductsMarketData = () => {
  const allProductData = [
    { ...useContext(DpiTokenMarketDataContext) },
    { ...useContext(CgiTokenMarketDataContext) },
    { ...useContext(FliTokenMarketDataContext) },
    { ...useContext(MviTokenMarketDataContext) },
  ]
  return allProductData
}

export default useAllProductsMarketData

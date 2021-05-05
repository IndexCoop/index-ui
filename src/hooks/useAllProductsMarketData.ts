import { useContext } from 'react'

import { DpiTokenMarketDataContext } from 'contexts/DpiTokenMarketData'
import { CgiTokenMarketDataContext } from 'contexts/CgiTokenMarketData'
import { Eth2xFliTokenMarketDataContext } from 'contexts/Eth2xFliTokenMarketData'
import { MviTokenMarketDataContext } from 'contexts/MviTokenMarketData'
import { Btc2xFliTokenMarketDataContext } from 'contexts/Btc2xFliTokenMarketData'

const useAllProductsMarketData = () => {
  const allProductData = [
    { ...useContext(DpiTokenMarketDataContext) },
    { ...useContext(CgiTokenMarketDataContext) },
    { ...useContext(Eth2xFliTokenMarketDataContext) },
    { ...useContext(MviTokenMarketDataContext) },
    { ...useContext(Btc2xFliTokenMarketDataContext) },
  ]
  return allProductData
}

export default useAllProductsMarketData

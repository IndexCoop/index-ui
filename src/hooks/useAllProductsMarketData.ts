import { useContext } from 'react'

import { DpiTokenMarketDataContext } from 'contexts/DpiTokenMarketData'
import { Eth2xFliTokenMarketDataContext } from 'contexts/Eth2xFliTokenMarketData'
import { MviTokenMarketDataContext } from 'contexts/MviTokenMarketData'
import { Btc2xFliTokenMarketDataContext } from 'contexts/Btc2xFliTokenMarketData'
import { BedTokenMarketDataContext } from 'contexts/BedTokenMarketData'
import { DataTokenMarketDataContext } from 'contexts/DataTokenMarketData'

const useAllProductsMarketData = () => {
  const allProductData = [
    { ...useContext(DpiTokenMarketDataContext) },
    { ...useContext(Eth2xFliTokenMarketDataContext) },
    { ...useContext(MviTokenMarketDataContext) },
    { ...useContext(Btc2xFliTokenMarketDataContext) },
    { ...useContext(BedTokenMarketDataContext) },
    { ...useContext(DataTokenMarketDataContext) },
  ]
  return allProductData
}

export default useAllProductsMarketData

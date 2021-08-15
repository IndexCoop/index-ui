import { useContext } from 'react'

import { DpiTokenMarketDataContext } from 'contexts/DpiTokenMarketData'
import { Eth2xFliTokenMarketDataContext } from 'contexts/Eth2xFliTokenMarketData'
import { MviTokenMarketDataContext } from 'contexts/MviTokenMarketData'
import { Btc2xFliTokenMarketDataContext } from 'contexts/Btc2xFliTokenMarketData'
import { BedTokenMarketDataContext } from 'contexts/BedTokenMarketData'

const useCombinedTokenMarketCapData = () => {
  const allMarketCaps = [
    { ...useContext(DpiTokenMarketDataContext) }?.latestMarketCap || 0,
    { ...useContext(Eth2xFliTokenMarketDataContext) }?.latestMarketCap || 0,
    { ...useContext(MviTokenMarketDataContext) }?.latestMarketCap || 0,
    { ...useContext(Btc2xFliTokenMarketDataContext) }?.latestMarketCap || 0,
    { ...useContext(BedTokenMarketDataContext) }?.latestMarketCap || 0,
  ]
  return allMarketCaps?.reduce((total, cap) => total + cap)
}

export default useCombinedTokenMarketCapData

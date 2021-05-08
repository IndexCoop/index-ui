import { useContext } from 'react'

import { DpiTokenMarketDataContext } from 'contexts/DpiTokenMarketData'
import { CgiTokenMarketDataContext } from 'contexts/CgiTokenMarketData'
import { Eth2xFliTokenMarketDataContext } from 'contexts/Eth2xFliTokenMarketData'
import { MviTokenMarketDataContext } from 'contexts/MviTokenMarketData'
import { Btc2xFliTokenMarketDataContext } from 'contexts/Btc2xFliTokenMarketData'

const useCombinedTokenMarketCapData = () => {
  const allMarketCaps = [
    { ...useContext(DpiTokenMarketDataContext) }?.latestMarketCap || 0,
    { ...useContext(CgiTokenMarketDataContext) }?.latestMarketCap || 0,
    { ...useContext(Eth2xFliTokenMarketDataContext) }?.latestMarketCap || 0,
    { ...useContext(MviTokenMarketDataContext) }?.latestMarketCap || 0,
    { ...useContext(Btc2xFliTokenMarketDataContext) }?.latestMarketCap || 0,
  ]
  return allMarketCaps?.reduce((total, cap) => total + cap)
}

export default useCombinedTokenMarketCapData

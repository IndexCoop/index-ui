import { useContext } from 'react'

import { MarketDataContext } from 'contexts/MarketData'

const useMarketData = () => {
  return { ...useContext(MarketDataContext) }
}

export default useMarketData
import { useContext } from 'react'

import { DpiMarketDataContext } from 'contexts/DpiHistoricalMarketData'

const useMarketData = () => {
  return { ...useContext(DpiMarketDataContext) }
}

export default useMarketData
import { useContext } from 'react'

import { BedTokenMarketDataContext } from 'contexts/BedTokenMarketData'

const useBedTokenMarketData = () => {
  return { ...useContext(BedTokenMarketDataContext) }
}

export default useBedTokenMarketData

import { useContext } from 'react'

import { MviTokenMarketDataContext } from 'contexts/MviTokenMarketData'

const useMviTokenMarketData = () => {
  return { ...useContext(MviTokenMarketDataContext) }
}

export default useMviTokenMarketData

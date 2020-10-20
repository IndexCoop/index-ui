import { useContext } from 'react'

import { DpiTokenMarketDataContext } from 'contexts/DpiTokenMarketData'

const useDpiTokenMarketData = () => {
  return { ...useContext(DpiTokenMarketDataContext) }
}

export default useDpiTokenMarketData

import { useContext } from 'react'

import { Matic2xFLIPTokenMarketDataContext } from 'contexts/Matic2xFLIPTokenMarketData'

const useMatic2xFLIPTokenMarketData = () => {
  return { ...useContext(Matic2xFLIPTokenMarketDataContext) }
}

export default useMatic2xFLIPTokenMarketData

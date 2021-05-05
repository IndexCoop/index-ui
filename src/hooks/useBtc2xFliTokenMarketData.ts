import { useContext } from 'react'

import { Btc2xFliTokenMarketDataContext } from 'contexts/Btc2xFliTokenMarketData'

const useBtc2xFliTokenMarketData = () => {
  return { ...useContext(Btc2xFliTokenMarketDataContext) }
}

export default useBtc2xFliTokenMarketData

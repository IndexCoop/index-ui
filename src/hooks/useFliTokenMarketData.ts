import { useContext } from 'react'

import { FliTokenMarketDataContext } from 'contexts/FliTokenMarketData'

const useFliTokenMarketData = () => {
  return { ...useContext(FliTokenMarketDataContext) }
}

export default useFliTokenMarketData

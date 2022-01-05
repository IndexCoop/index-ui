import { useContext } from 'react'

import { GmiTokenMarketDataContext } from 'contexts/GmiTokenMarketData'

const useGmiTokenMarketData = () => {
  return { ...useContext(GmiTokenMarketDataContext) }
}

export default useGmiTokenMarketData

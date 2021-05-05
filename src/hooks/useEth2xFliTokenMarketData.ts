import { useContext } from 'react'

import { Eth2xFliTokenMarketDataContext } from 'contexts/Eth2xFliTokenMarketData'

const useEth2xFliTokenMarketData = () => {
  return { ...useContext(Eth2xFliTokenMarketDataContext) }
}

export default useEth2xFliTokenMarketData

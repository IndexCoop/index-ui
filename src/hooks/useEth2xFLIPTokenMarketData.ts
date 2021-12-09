import { useContext } from 'react'

import { Eth2xFLIPTokenMarketDataContext } from 'contexts/Eth2xFLIPTokenMarketData'

const useEth2xFLIPTokenMarketData = () => {
  return { ...useContext(Eth2xFLIPTokenMarketDataContext) }
}

export default useEth2xFLIPTokenMarketData

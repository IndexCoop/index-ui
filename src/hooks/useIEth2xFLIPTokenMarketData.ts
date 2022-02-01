import { useContext } from 'react'

import { IEth2xFLIPTokenMarketDataContext } from 'contexts/IEth2xFLIPTokenMarketData'

const useIEth2xFLIPTokenMarketData = () => {
  return { ...useContext(IEth2xFLIPTokenMarketDataContext) }
}

export default useIEth2xFLIPTokenMarketData

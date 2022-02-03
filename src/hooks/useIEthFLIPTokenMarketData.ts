import { useContext } from 'react'

import { IEthFLIPTokenMarketDataContext } from 'contexts/IEthFLIPTokenMarketData'

const useIEthFLIPTokenMarketData = () => {
  return { ...useContext(IEthFLIPTokenMarketDataContext) }
}

export default useIEthFLIPTokenMarketData

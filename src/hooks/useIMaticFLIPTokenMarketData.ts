import { useContext } from 'react'

import { IMaticFLIPTokenMarketDataContext } from 'contexts/IMaticFLIPTokenMarketData'

const useIMaticFLIPTokenMarketData = () => {
  return { ...useContext(IMaticFLIPTokenMarketDataContext) }
}

export default useIMaticFLIPTokenMarketData

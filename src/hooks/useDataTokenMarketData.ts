import { useContext } from 'react'

import { DataTokenMarketDataContext } from 'contexts/DataTokenMarketData'

const useDataTokenMarketData = () => {
  return { ...useContext(DataTokenMarketDataContext) }
}

export default useDataTokenMarketData

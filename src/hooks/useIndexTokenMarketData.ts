import { useContext } from 'react'

import { IndexTokenMarketDataContext } from 'contexts/IndexTokenMarketData'

const useIndexTokenMarketData = () => {
  return { ...useContext(IndexTokenMarketDataContext) }
}

export default useIndexTokenMarketData

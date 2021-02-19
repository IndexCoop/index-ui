import { useContext } from 'react'

import { CgiTokenMarketDataContext } from 'contexts/CgiTokenMarketData'

const useCgiTokenMarketData = () => {
  return { ...useContext(CgiTokenMarketDataContext) }
}

export default useCgiTokenMarketData

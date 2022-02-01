import { useContext } from 'react'

import { IMatic2xFLITokenMarketDataContext } from 'contexts/IMatic2xFLITokenMarketData'

const useIMatic2xFLITokenMarketData = () => {
  return { ...useContext(IMatic2xFLITokenMarketDataContext) }
}

export default useIMatic2xFLITokenMarketData

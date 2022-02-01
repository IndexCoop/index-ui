import { useContext } from 'react'

import { Matic2xFLITokenMarketDataContext } from 'contexts/Matic2xFLITokenMarketData'

const useMatic2xFLITokenMarketData = () => {
  return { ...useContext(Matic2xFLITokenMarketDataContext) }
}

export default useMatic2xFLITokenMarketData

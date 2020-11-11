import { useContext } from 'react'

import { BuySellContext } from 'contexts/BuySell'

const useBuySell = () => {
  return { ...useContext(BuySellContext) }
}

export default useBuySell

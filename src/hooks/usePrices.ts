import { useContext } from 'react'

import { PricesContext } from 'contexts/Prices'

const usePrices = () => {
  return { ...useContext(PricesContext) }
}

export default usePrices
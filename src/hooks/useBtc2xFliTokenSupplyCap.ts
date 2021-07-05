import { useContext } from 'react'

import { Btc2xFliTokenSupplyCapContext } from 'contexts/Btc2xFliTokenSupplyCap'

const useBtc2xFliTokenSupplyCap = () => {
  return { ...useContext(Btc2xFliTokenSupplyCapContext) }
}

export default useBtc2xFliTokenSupplyCap

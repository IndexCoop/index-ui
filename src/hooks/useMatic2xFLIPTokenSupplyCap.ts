import { useContext } from 'react'

import { Matic2xFLIPTokenSupplyCapContext } from 'contexts/Matic2xFLIPTokenSupplyCap'

const useMatic2xFLIPTokenSupplyCap = () => {
  return { ...useContext(Matic2xFLIPTokenSupplyCapContext) }
}

export default useMatic2xFLIPTokenSupplyCap

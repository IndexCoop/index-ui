import { useContext } from 'react'

import { Matic2xFLITokenSupplyCapContext } from 'contexts/Matic2xFLITokenSupplyCap'

const useMatic2xFLITokenSupplyCap = () => {
  return { ...useContext(Matic2xFLITokenSupplyCapContext) }
}

export default useMatic2xFLITokenSupplyCap

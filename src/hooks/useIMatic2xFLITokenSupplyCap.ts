import { useContext } from 'react'

import { IMatic2xFLITokenSupplyCapContext } from 'contexts/IMatic2xFLITokenSupplyCap'

const useIMatic2xFLITokenSupplyCap = () => {
  return { ...useContext(IMatic2xFLITokenSupplyCapContext) }
}

export default useIMatic2xFLITokenSupplyCap

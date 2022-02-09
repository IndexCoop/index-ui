import { useContext } from 'react'

import { IEthFLIPTokenSupplyCapContext } from 'contexts/IEthFLIPTokenSupplyCap'

const useIEthFLIPTokenSupplyCap = () => {
  return { ...useContext(IEthFLIPTokenSupplyCapContext) }
}

export default useIEthFLIPTokenSupplyCap

import { useContext } from 'react'

import { IMaticFLIPTokenSupplyCapContext } from 'contexts/IMaticFLIPTokenSupplyCap'

const useIMaticFLIPTokenSupplyCap = () => {
  return { ...useContext(IMaticFLIPTokenSupplyCapContext) }
}

export default useIMaticFLIPTokenSupplyCap

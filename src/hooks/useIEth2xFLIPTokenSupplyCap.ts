import { useContext } from 'react'

import { IEth2xFLIPTokenSupplyCapContext } from 'contexts/IEth2xFLIPTokenSupplyCap'

const useIEth2xFLIPTokenSupplyCap = () => {
  return { ...useContext(IEth2xFLIPTokenSupplyCapContext) }
}

export default useIEth2xFLIPTokenSupplyCap

import { useContext } from 'react'

import { Eth2xFLIPTokenSupplyCapContext } from 'contexts/Eth2xFLIPTokenSupplyCap'

const useEth2xFLIPTokenSupplyCap = () => {
  return { ...useContext(Eth2xFLIPTokenSupplyCapContext) }
}

export default useEth2xFLIPTokenSupplyCap

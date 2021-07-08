import { useContext } from 'react'

import { Eth2xFliTokenSupplyCapContext } from 'contexts/Eth2xFliTokenSupplyCap'

const useEth2xFliTokenSupplyCap = () => {
  return { ...useContext(Eth2xFliTokenSupplyCapContext) }
}

export default useEth2xFliTokenSupplyCap

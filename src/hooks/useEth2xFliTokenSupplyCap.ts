import { useContext } from 'react'

import { Eth2xFliTokenTotalSupplyContext } from 'contexts/Eth2xFliTokenTotalSupply'

const useEth2xFliTokenSupplyCap = () => {
  return { ...useContext(Eth2xFliTokenTotalSupplyContext) }
}

export default useEth2xFliTokenSupplyCap

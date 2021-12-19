import { useContext } from 'react'

import { TokenSupplyContext } from '../contexts/TokenSupply'

const useTokenSupply = () => {
  return { ...useContext(TokenSupplyContext) }
}

export default useTokenSupply

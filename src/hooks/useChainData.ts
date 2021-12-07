import { useContext } from 'react'

import { ChainDataContext } from 'contexts/ChainData'

const useChainData = () => {
  return { ...useContext(ChainDataContext) }
}

export default useChainData

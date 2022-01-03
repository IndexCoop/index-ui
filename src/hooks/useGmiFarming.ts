import { useContext } from 'react'

import { FarmingContext } from 'contexts/Farming'

const useGmiFarming = () => {
  return { ...useContext(FarmingContext) }
}

export default useGmiFarming

import { useContext } from 'react'

import { V3FarmingContext } from 'contexts/V3Farming'

const useV3Farming = () => {
  return { ...useContext(V3FarmingContext) }
}

export default useV3Farming

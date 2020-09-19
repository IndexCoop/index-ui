import { useContext } from 'react'

import { FarmingContext } from 'contexts/Farming'

const useFarming = () => {
  return { ...useContext(FarmingContext) }
}

export default useFarming
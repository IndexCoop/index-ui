import { useContext } from 'react'

import { FarmingTwoContext } from 'contexts/FarmingTwo'

const useFarmingTwo = () => {
  return { ...useContext(FarmingTwoContext) }
}

export default useFarmingTwo

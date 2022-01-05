import { useContext } from 'react'

import { GmiFarmingContext } from 'contexts/GmiFarming'

const useGmiFarming = () => {
  return { ...useContext(GmiFarmingContext) }
}

export default useGmiFarming

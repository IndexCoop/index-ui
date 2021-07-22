import { useContext } from 'react'

import { BedIndexComponentsContext } from 'contexts/BedIndexComponents'

const useBedIndexComponents = () => {
  return { ...useContext(BedIndexComponentsContext) }
}

export default useBedIndexComponents

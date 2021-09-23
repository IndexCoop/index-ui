import { useContext } from 'react'

import { DataComponentsContext } from 'contexts/DataComponents'

const useDataComponents = () => {
  return { ...useContext(DataComponentsContext) }
}

export default useDataComponents

import { useContext } from 'react'

import { MviComponentsContext } from 'contexts/MviComponents'

const useMviComponents = () => {
  return { ...useContext(MviComponentsContext) }
}

export default useMviComponents

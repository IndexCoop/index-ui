import { useContext } from 'react'

import SetContext from 'contexts/Set/SetContext'

const useSet = () => {
  return { ...useContext(SetContext) }
}

export default useSet

import { useContext } from 'react'

import { DpiIndexComponentsContext } from 'contexts/DpiIndexComponents'

const useDpiIndexComponents = () => {
  return { ...useContext(DpiIndexComponentsContext) }
}

export default useDpiIndexComponents

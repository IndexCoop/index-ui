import { useContext } from 'react'

import { CgiIndexComponentsContext } from 'contexts/CgiIndexComponents'

const useCgiIndexComponents = () => {
  return { ...useContext(CgiIndexComponentsContext) }
}

export default useCgiIndexComponents

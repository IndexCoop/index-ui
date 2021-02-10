import { useContext } from 'react'

import { MediaQueryContext } from 'contexts/MediaQuery'

const useMediaQuery = () => {
  return { ...useContext(MediaQueryContext) }
}

export default useMediaQuery

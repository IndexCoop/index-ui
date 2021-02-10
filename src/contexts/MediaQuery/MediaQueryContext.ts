import { createContext } from 'react'

interface MediaQueryContextValues {
  deviceWidth?: number
  deviceHeight?: number
  isMobile?: boolean
  isTablet?: boolean
  isDesktop?: boolean
}

const MediaQueryContext = createContext<MediaQueryContextValues>({})

export default MediaQueryContext

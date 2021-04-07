import { createContext } from 'react'

interface MediaQueryContextValues {
  deviceWidth?: number
  deviceHeight?: number
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

const MediaQueryContext = createContext<MediaQueryContextValues>({
  isMobile: false,
  isTablet: false,
  isDesktop: false,
})

export default MediaQueryContext

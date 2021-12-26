import React, { useEffect,useState } from 'react'

import MediaQueryContext from './MediaQueryContext'

const MediaQueryProvider: React.FC = ({ children }) => {
  /* eslint no-restricted-globals:0 */
  const [deviceWidth, setDeviceWidth] = useState<number>(0)
  const [deviceHeight, setDeviceHeight] = useState<number>(0)
  /* eslint no-restricted-globals:1 */
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isTablet, setIsTablet] = useState<boolean>(false)
  const [isDesktop, setIsDesktop] = useState<boolean>(false)

  const handleWindowSizeChange = () => {
    setDeviceWidth(window.innerWidth)
    setDeviceHeight(window.innerHeight)

    if (window.innerWidth < 500) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }

    if (window.innerWidth < 900) {
      setIsTablet(true)
    } else {
      setIsTablet(false)
    }

    if (window.innerWidth >= 900) {
      setIsDesktop(true)
    } else {
      setIsDesktop(false)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  })

  useEffect(() => {
    handleWindowSizeChange()
  }, [])

  return (
    <MediaQueryContext.Provider
      value={{
        deviceWidth,
        deviceHeight,
        isMobile,
        isTablet,
        isDesktop,
      }}
    >
      {children}
    </MediaQueryContext.Provider>
  )
}

export default MediaQueryProvider

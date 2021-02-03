import React, { useState, useEffect } from 'react'

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

    if (innerWidth < 500) {
      setIsMobile(true)
    } else if (innerWidth < 900) {
      setIsTablet(true)
    } else {
      setIsDesktop(true)
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

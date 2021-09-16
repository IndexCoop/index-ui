import React, { useState, useEffect } from 'react'
import DpiIndexComponentsContext from './DpiIndexComponentsContext'
import { fetchSetComponents } from 'utils/tokensetsApi'

const DpiIndexComponentsProvider: React.FC = ({ children }) => {
  const [dpiIndexComponents, setDpiIndexComponents] = useState<any>([])

  useEffect(() => {
    fetchSetComponents('dpi')
      .then((response: any) => {
        setDpiIndexComponents(response)
      })
      .catch((error: any) => console.log(error))
  }, [])

  return (
    <DpiIndexComponentsContext.Provider
      value={{ components: dpiIndexComponents }}
    >
      {children}
    </DpiIndexComponentsContext.Provider>
  )
}

export default DpiIndexComponentsProvider

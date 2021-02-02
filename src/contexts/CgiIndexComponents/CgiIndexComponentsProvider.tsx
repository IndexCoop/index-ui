import React, { useState, useEffect } from 'react'
import DpiIndexComponentsContext from './CgiIndexComponentsContext'
import { fetchSetComponents } from 'utils/tokensetsApi'

const CgiIndexComponentsProvider: React.FC = ({ children }) => {
  const [cgiIndexComponents, setCgiIndexComponents] = useState<any>([])

  useEffect(() => {
    fetchSetComponents('cgi')
      .then((response: any) => {
        setCgiIndexComponents(response)
      })
      .catch((error: any) => console.log(error))
  }, [])

  return (
    <DpiIndexComponentsContext.Provider
      value={{ components: cgiIndexComponents }}
    >
      {children}
    </DpiIndexComponentsContext.Provider>
  )
}

export default CgiIndexComponentsProvider

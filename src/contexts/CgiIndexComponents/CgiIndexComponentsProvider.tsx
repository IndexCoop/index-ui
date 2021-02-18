import React, { useState, useEffect } from 'react'
import DpiIndexComponentsContext from './CgiIndexComponentsContext'
import { fetchSetComponentsBeta } from 'utils/tokensetsApi'

const CgiIndexComponentsProvider: React.FC = ({ children }) => {
  const [cgiIndexComponents, setCgiIndexComponents] = useState<any>([])

  useEffect(() => {
    fetchSetComponentsBeta('cgi')
      .then((res) => {
        setCgiIndexComponents(res)
      })
      .catch((error: any) => console.log(error))
  }, [])

  return (
    <DpiIndexComponentsContext.Provider value={cgiIndexComponents}>
      {children}
    </DpiIndexComponentsContext.Provider>
  )
}

export default CgiIndexComponentsProvider

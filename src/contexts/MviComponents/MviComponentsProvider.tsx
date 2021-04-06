import React, { useState, useEffect } from 'react'
import DpiIndexComponentsContext from './MviComponentsContext'
import { fetchSetComponentsBeta } from 'utils/tokensetsApi'

const MviIndexComponentsProvider: React.FC = ({ children }) => {
  const [cgiIndexComponents, setMviIndexComponents] = useState<any>([])

  useEffect(() => {
    fetchSetComponentsBeta('cgi')
      .then((res) => {
        setMviIndexComponents(res)
      })
      .catch((error: any) => console.log(error))
  }, [])

  return (
    <DpiIndexComponentsContext.Provider value={cgiIndexComponents}>
      {children}
    </DpiIndexComponentsContext.Provider>
  )
}

export default MviIndexComponentsProvider

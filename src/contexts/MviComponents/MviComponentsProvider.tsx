import React, { useState, useEffect } from 'react'
import MviIndexComponentsContext from './MviComponentsContext'
import { fetchSetComponentsBeta } from 'utils/tokensetsApi'

const MviIndexComponentsProvider: React.FC = ({ children }) => {
  const [cgiIndexComponents, setMviIndexComponents] = useState<any>([])

  useEffect(() => {
    fetchSetComponentsBeta('mvi')
      .then((res) => {
        console.log('res is ', res)
        setMviIndexComponents(res)
      })
      .catch((error: any) => console.log(error))
  }, [])

  return (
    <MviIndexComponentsContext.Provider value={cgiIndexComponents}>
      {children}
    </MviIndexComponentsContext.Provider>
  )
}

export default MviIndexComponentsProvider

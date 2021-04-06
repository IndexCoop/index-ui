import React, { useState, useEffect } from 'react'
import MviIndexComponentsContext from './MviComponentsContext'
import { fetchSetComponentsBeta } from 'utils/tokensetsApi'

const MviIndexComponentsProvider: React.FC = ({ children }) => {
  const [mviIndexComponents, setMviIndexComponents] = useState<any>([])

  useEffect(() => {
    fetchSetComponentsBeta('mvi')
      .then((res) => {
        setMviIndexComponents(res)
      })
      .catch((error: any) => console.log(error))
  }, [])

  return (
    <MviIndexComponentsContext.Provider value={mviIndexComponents}>
      {children}
    </MviIndexComponentsContext.Provider>
  )
}

export default MviIndexComponentsProvider

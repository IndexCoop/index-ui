import React, { useState, useEffect } from 'react'
import BedIndexComponentsContext from './BedIndexComponentsContext'
import { fetchSetComponents } from 'utils/tokensetsApi'

const BedIndexComponentsProvider: React.FC = ({ children }) => {
  const [bedIndexComponents, setBedIndexComponents] = useState<any>([])

  useEffect(() => {
    fetchSetComponents('bed')
      .then((response: any) => {
        setBedIndexComponents(response)
      })
      .catch((error: any) => console.log(error))
  }, [])

  return (
    <BedIndexComponentsContext.Provider
      value={{ components: bedIndexComponents }}
    >
      {children}
    </BedIndexComponentsContext.Provider>
  )
}

export default BedIndexComponentsProvider

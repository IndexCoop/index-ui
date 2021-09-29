import React, { useState, useEffect } from 'react'
import DataIndexComponentsContext from './DataComponentsContext'
import { fetchSetComponents } from 'utils/tokensetsApi'

const DataIndexComponentsProvider: React.FC = ({ children }) => {
  const [dataIndexComponents, setDataIndexComponents] = useState<any>([])

  useEffect(() => {
    fetchSetComponents('data')
      .then((res) => {
        setDataIndexComponents(res)
      })
      .catch((error: any) => console.log(error))
  }, [])

  return (
    <DataIndexComponentsContext.Provider
      value={{ components: dataIndexComponents }}
    >
      {children}
    </DataIndexComponentsContext.Provider>
  )
}

export default DataIndexComponentsProvider

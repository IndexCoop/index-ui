import React, { useState, useEffect } from 'react'
import FliIndexPortfolioDataContext from './FliIndexPortfolioDataContext'
import { fetchSetPortfolioData } from 'utils/tokensetsApi'

const FliIndexPortfolioDataProvider: React.FC = ({ children }) => {
  const [fliIndexPortfolioData, setFliIndexPortfolioData] = useState<any>([])

  useEffect(() => {
    fetchSetPortfolioData('eth2xfli')
      .then((response: any) => {
        setFliIndexPortfolioData(response)
      })
      .catch((error: any) => console.log(error))
  }, [])

  return (
    <FliIndexPortfolioDataContext.Provider value={{ ...fliIndexPortfolioData }}>
      {children}
    </FliIndexPortfolioDataContext.Provider>
  )
}

export default FliIndexPortfolioDataProvider

import React, { useState, useEffect } from 'react'
import FliIndexPortfolioDataContext from './FliIndexPortfolioDataContext'
import { fetchSetComponents } from 'utils/tokensetsApi'
import { tokensetsFliId } from 'constants/tokensetsIds'

const FliIndexPortfolioDataProvider: React.FC = ({ children }) => {
  const [fliIndexPortfolioData, setFliIndexPortfolioData] = useState<any>([])

  useEffect(() => {
    fetchSetComponents(tokensetsFliId)
      .then((response: any) => {
        setFliIndexPortfolioData(response)
      })
      .catch((error: any) => console.log(error))
  }, [])

  return (
    <FliIndexPortfolioDataContext.Provider
      value={{ components: fliIndexPortfolioData }}
    >
      {children}
    </FliIndexPortfolioDataContext.Provider>
  )
}

export default FliIndexPortfolioDataProvider

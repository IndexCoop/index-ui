import React, { useState, useEffect } from 'react'
import FliIndexPortfolioDataContext from './FliIndexPortfolioDataContext'
import { fetchSetComponents } from 'utils/tokensetsApi'
import { Ethereum2xFlexibleLeverageIndex } from 'constants/productTokens'

const FliIndexPortfolioDataProvider: React.FC = ({ children }) => {
  const [fliIndexPortfolioData, setFliIndexPortfolioData] = useState<any>([])

  useEffect(() => {
    fetchSetComponents(Ethereum2xFlexibleLeverageIndex.tokensetsId)
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

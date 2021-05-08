import React, { useState, useEffect } from 'react'
import Eth2xFliPortfolioDataContext from './Eth2xFliPortfolioDataContext'
import { fetchSetComponents } from 'utils/tokensetsApi'
import { Ethereum2xFlexibleLeverageIndex } from 'constants/productTokens'

const Eth2xFliPortfolioDataProvider: React.FC = ({ children }) => {
  const [fliIndexPortfolioData, setFliIndexPortfolioData] = useState<any>([])

  useEffect(() => {
    fetchSetComponents(Ethereum2xFlexibleLeverageIndex.tokensetsId)
      .then((response: any) => {
        setFliIndexPortfolioData(response)
      })
      .catch((error: any) => console.log(error))
  }, [])

  return (
    <Eth2xFliPortfolioDataContext.Provider
      value={{ components: fliIndexPortfolioData }}
    >
      {children}
    </Eth2xFliPortfolioDataContext.Provider>
  )
}

export default Eth2xFliPortfolioDataProvider

import React, { useState, useEffect } from 'react'
import Eth2xFliPortfolioDataContext from './Eth2xFliPortfolioDataContext'
import { fetchSetComponents } from 'utils/tokensetsApi'
import { TokenSetsIds } from 'constants/tokenIds'

const Eth2xFliPortfolioDataProvider: React.FC = ({ children }) => {
  const [fliIndexPortfolioData, setFliIndexPortfolioData] = useState<any>([])

  useEffect(() => {
    fetchSetComponents(TokenSetsIds.ETH2XFLI)
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

import React, { useState, useEffect } from 'react'
import Btc2xFliPortfolioDataContext from './Btc2xFliPortfolioDataContext'
import { fetchSetComponentsBeta } from 'utils/tokensetsApi'
import { TokenSetsIds } from 'constants/tokenIds'

const Btc2xFliIPortfolioDataProvider: React.FC = ({ children }) => {
  const [fliIndexPortfolioData, setFliIndexPortfolioData] = useState<any>([])

  useEffect(() => {
    fetchSetComponentsBeta(TokenSetsIds.BTC2XFLI)
      .then((response: any) => {
        setFliIndexPortfolioData(response)
      })
      .catch((error: any) => console.log(error))
  }, [])

  return (
    <Btc2xFliPortfolioDataContext.Provider
      value={{ components: fliIndexPortfolioData }}
    >
      {children}
    </Btc2xFliPortfolioDataContext.Provider>
  )
}

export default Btc2xFliIPortfolioDataProvider

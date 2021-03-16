import { useContext } from 'react'

import { FliIndexPortfolioDataContext } from 'contexts/FliIndexPortfolioData'

const useFliIndexPortfolioData = () => {
  return { ...useContext(FliIndexPortfolioDataContext) }
}

export default useFliIndexPortfolioData

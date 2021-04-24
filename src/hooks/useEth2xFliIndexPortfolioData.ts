import { useContext } from 'react'

import { Eth2xFliIndexPortfolioDataContext } from 'contexts/Eth2xFliIndexPortfolioData'

const useEth2xFliIndexPortfolioData = () => {
  return { ...useContext(Eth2xFliIndexPortfolioDataContext) }
}

export default useEth2xFliIndexPortfolioData

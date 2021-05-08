import { useContext } from 'react'

import { Eth2xFliIndexPortfolioDataContext } from 'contexts/Eth2xFliPortfolioData'

const useEth2xFliIndexPortfolioData = () => {
  return { ...useContext(Eth2xFliIndexPortfolioDataContext) }
}

export default useEth2xFliIndexPortfolioData

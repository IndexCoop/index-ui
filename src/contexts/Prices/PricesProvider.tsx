import React, { useState } from 'react'

import { useQuery } from '@apollo/react-hooks'
import { DPI_ETH_UNISWAP_QUERY } from '../../utils/graphql';

import PricesContext from './PricesContext'
import BigNumber from 'bignumber.js';

const PricesProvider: React.FC = ({ children }) => {
  const [dpiPrice, setDpiPrice] = useState<string>()
  const [totalUSDInFarms, setTotalUSDInFarms] = useState<number>()

  const { loading, error, data: uniswapData }= useQuery(
    DPI_ETH_UNISWAP_QUERY
  );

  if (!totalUSDInFarms && !loading && !error) {
    setTotalUSDInFarms(uniswapData?.pairs[0]?.reserveUSD)
  }

  if (!dpiPrice && !loading && !error) {
    const EthPriceInUsd = new BigNumber(uniswapData?.bundle.ethPrice)
    const DpiPriceInEth = new BigNumber(uniswapData?.tokens[0]?.derivedETH)
    const DpiPriceInUsd = EthPriceInUsd.multipliedBy(DpiPriceInEth);
    setDpiPrice(DpiPriceInUsd.toString());
  }
  
  return (
    <PricesContext.Provider value={{
      dpiPrice,
      totalUSDInFarms
    }}>
      {children}
    </PricesContext.Provider>
  )
}

export default PricesProvider
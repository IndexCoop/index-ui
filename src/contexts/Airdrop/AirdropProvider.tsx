import React, { useState } from 'react'
import BigNumber from 'bignumber.js';
import { useQuery } from '@apollo/react-hooks'

import AirdropContext from './AirdropContext'

import { DPI_ETH_UNISWAP_QUERY } from 'utils/graphql';

const AirdropProvider: React.FC = ({ children }) => {
  const [dpiPrice, setDpiPrice] = useState<string>()
  const [totalUSDInFarms, setTotalUSDInFarms] = useState<number>()

  const { loading, error, data: uniswapData } = useQuery(
    DPI_ETH_UNISWAP_QUERY
  );

  const isUniswapFetchLoadedForFirstTime = !totalUSDInFarms && !loading && !error;

  if (isUniswapFetchLoadedForFirstTime) {
    setTotalUSDInFarms(uniswapData?.pairs[0]?.reserveUSD)

    const EthPriceInUsd = new BigNumber(uniswapData?.bundle.ethPrice)
    const DpiPriceInEth = new BigNumber(uniswapData?.tokens[0]?.derivedETH)
    const DpiPriceInUsd = EthPriceInUsd.multipliedBy(DpiPriceInEth);
    setDpiPrice(DpiPriceInUsd.toString());
  }

  
  return (
    <AirdropContext.Provider value={{
      dpiPrice,
      totalUSDInFarms
    }}>
      {children}
    </AirdropContext.Provider>
  )
}

export default AirdropProvider
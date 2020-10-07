import React, { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js';
import { useQuery } from '@apollo/react-hooks'

import PricesContext from './PricesContext'

import { DPI_ETH_UNISWAP_QUERY } from 'utils/graphql';
import { indexTokenAddress } from 'constants/tokenAddresses';

const PricesProvider: React.FC = ({ children }) => {
  const [dpiPrice, setDpiPrice] = useState<string>()
  const [totalUSDInFarms, setTotalUSDInFarms] = useState<number>()
  const [apy, setAPY] = useState<string>()

  const { loading, error, data: uniswapData } = useQuery(
    DPI_ETH_UNISWAP_QUERY
  );

  const isUniswapFetchLoadedForFirstTime = !totalUSDInFarms && !loading && !error;

  if (isUniswapFetchLoadedForFirstTime) {
    setTotalUSDInFarms(uniswapData?.pairs[0]?.reserveUSD)
  }

  useEffect(() => {
    const coingeckoIndexPriceUrl =
      `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${indexTokenAddress}&vs_currencies=usd`

    fetch(coingeckoIndexPriceUrl)
      .then(response => response.json())
      .then(response => {
        const formattedIndexTokenAddress = indexTokenAddress?.toLowerCase()
        const indexPrices = response[formattedIndexTokenAddress as string]
        const indexUsdPrice = indexPrices.usd
        setDpiPrice(indexUsdPrice)
      })
      .catch(error => console.log(error));
  }, [])

  useEffect(() => {
    if (!dpiPrice || !totalUSDInFarms) return;

    const totalTokenEmissionsPerDay = 15000;
    const totalUSDEmissionPerDay = totalTokenEmissionsPerDay * Number(dpiPrice)
    const dailyYield = new BigNumber(totalUSDEmissionPerDay).dividedBy(new BigNumber(totalUSDInFarms)).multipliedBy(100)
    const calculatedApy = dailyYield.multipliedBy(365)

    setAPY(calculatedApy.toFixed(2))
  }, [totalUSDInFarms, dpiPrice])

  
  return (
    <PricesContext.Provider value={{
      dpiPrice,
      totalUSDInFarms,
      apy
    }}>
      {children}
    </PricesContext.Provider>
  )
}

export default PricesProvider
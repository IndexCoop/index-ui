import React, { useState, useEffect } from 'react'
import BigNumber from 'utils/bignumber'
import { useQuery } from '@apollo/react-hooks'

import PricesContext from './PricesContext'

import { DPI_ETH_UNISWAP_QUERY, ETH_MVI_UNISWAP_QUERY } from 'utils/graphql'
import { indexTokenAddress } from 'constants/ethContractAddresses'

const PricesProvider: React.FC = ({ children }) => {
  const [indexPrice, setIndexPrice] = useState<string>('0')
  const [ethereumPrice, setEthereumPrice] = useState<string>('0')
  const [usdInEthDpiPool, setUsdInEthDpiPool] = useState<number>()
  const [usdInEthMviPool, setUsdInEthMviPool] = useState<number>()

  const [apy] = useState<string>('0.00')
  const [farmTwoApy, setFarmTwoApy] = useState<string>('0.00')
  const [mviRewardsApy, setMviRewardsApy] = useState<string>('0.00')

  const {
    loading: ethDpiDataIsLoading,
    error: ethDpiDataError,
    data: ethDpiUniswapData,
  } = useQuery(DPI_ETH_UNISWAP_QUERY)
  const {
    loading: ethMviDataIsLoading,
    error: ethMviDataError,
    data: ethMviUniswapData,
  } = useQuery(ETH_MVI_UNISWAP_QUERY)

  useEffect(() => {
    if (!ethDpiDataIsLoading && !ethDpiDataError) {
      setUsdInEthDpiPool(ethDpiUniswapData?.pairs[0]?.reserveUSD)
    }
  }, [ethDpiDataIsLoading, ethDpiDataError, ethDpiUniswapData])

  useEffect(() => {
    if (!ethMviDataIsLoading && !ethMviDataError) {
      setUsdInEthMviPool(ethMviUniswapData?.pairs[0]?.reserveUSD)
    }
  }, [ethMviDataIsLoading, ethMviDataError, ethMviUniswapData])

  useEffect(() => {
    const coingeckoEthereumPriceUrl = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`

    fetch(coingeckoEthereumPriceUrl)
      .then((response) => response.json())
      .then((response) => {
        const price = response?.ethereum?.usd
        setEthereumPrice(price || '0')
      })
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    const coingeckoIndexPriceUrl = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${indexTokenAddress}&vs_currencies=usd`

    fetch(coingeckoIndexPriceUrl)
      .then((response) => response.json())
      .then((response) => {
        const formattedIndexTokenAddress = indexTokenAddress?.toLowerCase()
        const indexPrices = response[formattedIndexTokenAddress as string]
        const indexUsdPrice = indexPrices.usd
        setIndexPrice(indexUsdPrice)
      })
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    if (!indexPrice || !usdInEthDpiPool) return

    const totalTokenEmissionsPerDay = 700
    const totalUSDEmissionPerDay =
      totalTokenEmissionsPerDay * Number(indexPrice)
    const dailyYield = new BigNumber(totalUSDEmissionPerDay)
      .dividedBy(new BigNumber(usdInEthDpiPool))
      .multipliedBy(100)
    const calculatedApy = dailyYield.multipliedBy(365)

    setFarmTwoApy(calculatedApy.toFixed(2))
  }, [usdInEthDpiPool, indexPrice])

  useEffect(() => {
    if (!indexPrice || !usdInEthMviPool) return

    const totalTokenEmissionsPerDay = 127
    const totalUSDEmissionPerDay =
      totalTokenEmissionsPerDay * Number(indexPrice)
    const dailyYield = new BigNumber(totalUSDEmissionPerDay)
      .dividedBy(new BigNumber(usdInEthMviPool))
      .multipliedBy(100)
    const calculatedApy = dailyYield.multipliedBy(365)

    setMviRewardsApy(calculatedApy.toFixed(2))
  }, [usdInEthMviPool, indexPrice])

  const totalUSDInFarms =
    Number(usdInEthMviPool || '0') + Number(usdInEthDpiPool || '0')

  return (
    <PricesContext.Provider
      value={{
        indexPrice,
        ethereumPrice,
        totalUSDInFarms,
        apy,
        farmTwoApy,
        mviRewardsApy,
      }}
    >
      {children}
    </PricesContext.Provider>
  )
}

export default PricesProvider

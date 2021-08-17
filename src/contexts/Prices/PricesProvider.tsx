import React, { useState, useEffect } from 'react'
import BigNumber from 'utils/bignumber'
import { useQuery } from '@apollo/react-hooks'

import PricesContext from './PricesContext'

import { DPI_ETH_UNISWAP_QUERY, ETH_MVI_UNISWAP_QUERY } from 'utils/graphql'
import {
  farmTwoAddress,
  indexTokenAddress,
  mviStakingRewardsAddress,
} from 'constants/ethContractAddresses'
import { getAmountOfStakedTokens } from 'index-sdk/stake'
import useWallet from 'hooks/useWallet'

const PricesProvider: React.FC = ({ children }) => {
  const [indexPrice, setIndexPrice] = useState<string>('0')
  const [ethereumPrice, setEthereumPrice] = useState<string>('0')
  const [usdInEthDpiPool, setUsdInEthDpiPool] = useState<number>()
  const [totalSupplyInEthDpiPool, setTotalSupplyInEthDpiPool] =
    useState<number>()
  const [usdInEthMviPool, setUsdInEthMviPool] = useState<number>()
  const [totalSupplyInEthMviPool, setTotalSupplyInEthMviPool] =
    useState<number>()

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

  const { ethereum } = useWallet()

  useEffect(() => {
    if (!ethDpiDataIsLoading && !ethDpiDataError) {
      setUsdInEthDpiPool(ethDpiUniswapData?.pairs[0]?.reserveUSD)
      setTotalSupplyInEthDpiPool(ethDpiUniswapData?.pairs[0]?.totalSupply)
    }
  }, [ethDpiDataIsLoading, ethDpiDataError, ethDpiUniswapData])

  useEffect(() => {
    if (!ethMviDataIsLoading && !ethMviDataError) {
      setUsdInEthMviPool(ethMviUniswapData?.pairs[0]?.reserveUSD)
      setTotalSupplyInEthMviPool(ethMviUniswapData?.pairs[0]?.totalSupply)
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

  // DPI LM Emissions
  useEffect(() => {
    if (
      !indexPrice ||
      !usdInEthDpiPool ||
      !totalSupplyInEthDpiPool ||
      !ethereum ||
      !farmTwoAddress
    )
      return

    const totalTokenEmissionsPerDay = 425
    const totalUSDEmissionPerDay =
      totalTokenEmissionsPerDay * Number(indexPrice)

    //get usd price per lp token
    const pricePerLPToken = new BigNumber(usdInEthDpiPool).dividedBy(
      new BigNumber(totalSupplyInEthDpiPool)
    )

    //multiply by totalSupply
    getAmountOfStakedTokens(ethereum, farmTwoAddress)
      .then((tokensInStakingContract) => {
        const usdInStakingContract = new BigNumber(tokensInStakingContract)
          .dividedBy(new BigNumber(10).pow(18))
          .multipliedBy(pricePerLPToken)
        const dailyYield = new BigNumber(totalUSDEmissionPerDay)
          .dividedBy(usdInStakingContract)
          .multipliedBy(100)
        const calculatedApy = dailyYield.multipliedBy(365)

        setFarmTwoApy(calculatedApy.toFixed(2))
      })
      .catch((error) => {
        console.log(error)
        setFarmTwoApy('0.00')
      })
  }, [usdInEthDpiPool, indexPrice, ethereum, totalSupplyInEthDpiPool])

  // MVI LM Emissions
  useEffect(() => {
    if (
      !indexPrice ||
      !usdInEthMviPool ||
      !totalSupplyInEthMviPool ||
      !ethereum ||
      !mviStakingRewardsAddress
    )
      return

    const totalTokenEmissionsPerDay = 110
    const totalUSDEmissionPerDay =
      totalTokenEmissionsPerDay * Number(indexPrice)

    //get usd price per lp token
    const pricePerLPToken = new BigNumber(usdInEthMviPool).dividedBy(
      new BigNumber(totalSupplyInEthMviPool)
    )

    //multiply by totalSupply
    getAmountOfStakedTokens(ethereum, mviStakingRewardsAddress)
      .then((tokensInStakingContract) => {
        const usdInStakingContract = new BigNumber(tokensInStakingContract)
          .dividedBy(new BigNumber(10).pow(18))
          .multipliedBy(pricePerLPToken)
        const dailyYield = new BigNumber(totalUSDEmissionPerDay)
          .dividedBy(usdInStakingContract)
          .multipliedBy(100)
        const calculatedApy = dailyYield.multipliedBy(365)

        setMviRewardsApy(calculatedApy.toFixed(2))
      })
      .catch((error) => {
        console.log(error)
        setFarmTwoApy('0.00')
      })
  }, [usdInEthMviPool, indexPrice, ethereum, totalSupplyInEthMviPool])

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

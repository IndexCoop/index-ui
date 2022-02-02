import React, { useEffect, useMemo, useState } from 'react'

import { useQuery } from '@apollo/react-hooks'

import {
  bedTokenAddress,
  btc2xfliTokenAddress,
  dataTokenAddress,
  dpiTokenAddress,
  eth2xfliTokenAddress,
  farmTwoAddress,
  gmiStakingRewardsAddress,
  gmiTokenAddress,
  indexTokenAddress,
  mviStakingRewardsAddress,
  mviTokenAddress,
} from 'constants/ethContractAddresses'
import useWallet from 'hooks/useWallet'
import { getRewardsForDuration, getTotalSupply } from 'index-sdk/gmiStaking'
import { getAmountOfStakedTokens } from 'index-sdk/stake'
import BigNumber from 'utils/bignumber'
import { DPI_ETH_UNISWAP_QUERY, ETH_MVI_UNISWAP_QUERY } from 'utils/graphql'

import PricesContext from './PricesContext'

const PricesProvider: React.FC = ({ children }) => {
  const [indexPrice, setIndexPrice] = useState<string>('0')
  const [ethereumPrice, setEthereumPrice] = useState<string>('0')
  const [dpiPrice, setDpiPrice] = useState<number>(0)
  const [mviPrice, setMviPrice] = useState<number>(0)
  const [bedPrice, setBedPrice] = useState<number>(0)
  const [gmiPrice, setGmiPrice] = useState<number>(0)
  const [eth2xfliPrice, setEth2xfliPrice] = useState<number>(0)
  const [eth2xflipPrice, setEth2xflipPrice] = useState<number>(0)
  const [btc2xfliPrice, setBtc2xfliPrice] = useState<number>(0)
  const [dataPrice, setDataPrice] = useState<number>(0)
  const [iethflipPrice, setIEthflipPrice] = useState<number>(0)
  const [matic2xflipPrice, setMatic2xfliPrice] = useState<number>(0)
  const [imaticflipPrice, setIMaticflipPrice] = useState<number>(0)

  const [usdInEthDpiPool, setUsdInEthDpiPool] = useState<number>()
  const [totalSupplyInEthDpiPool, setTotalSupplyInEthDpiPool] =
    useState<number>()
  const [usdInEthMviPool, setUsdInEthMviPool] = useState<number>()
  const [totalSupplyInEthMviPool, setTotalSupplyInEthMviPool] =
    useState<number>()

  const [apy] = useState<string>('0.00')
  const [farmTwoApy, setFarmTwoApy] = useState<string>('0.00')
  const [mviRewardsApy, setMviRewardsApy] = useState<string>('0.00')
  const [gmiRewardsApy, setGmiRewardsApy] = useState<BigNumber>(
    new BigNumber(0)
  )

  const [gmiRewardsForDuration, setGmiRewardsForDuration] = useState<BigNumber>(
    new BigNumber(0)
  )
  const [gmiTotalSupply, setGmiTotalSupply] = useState<BigNumber>(
    new BigNumber(0)
  )

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

  // TODO: Remove this logic. Replace it with coingecko sourced data once available.
  useEffect(() => {
    fetch('https://api.tokensets.com/public/v2/portfolios/eth2x-fli-p')
      .then((response) => response.json())
      .then((response) => {
        setEth2xflipPrice(response?.portfolio.price_usd || 0)
      })
      .catch((error) => console.log(error))
    fetch('https://api.tokensets.com/public/v2/portfolios/ieth-fli-p')
      .then((response) => response.json())
      .then((response) => {
        setIEthflipPrice(response?.portfolio.price_usd || 0)
      })
      .catch((error) => console.log(error))
    fetch('https://api.tokensets.com/public/v2/portfolios/matic2x-fli-p')
      .then((response) => response.json())
      .then((response) => {
        setMatic2xfliPrice(response?.portfolio.price_usd || 0)
      })
      .catch((error) => console.log(error))
    fetch('https://api.tokensets.com/public/v2/portfolios/imatic-fli-p')
      .then((response) => response.json())
      .then((response) => {
        setIMaticflipPrice(response?.portfolio.price_usd || 0)
      })
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    const productAddresses = [
      dpiTokenAddress,
      mviTokenAddress,
      bedTokenAddress,
      gmiTokenAddress,
      eth2xfliTokenAddress,
      btc2xfliTokenAddress,
      dataTokenAddress,
      indexTokenAddress,
    ]
    const coinGeckoPriceUrl = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${productAddresses}&vs_currencies=usd`

    fetch(coinGeckoPriceUrl)
      .then((response) => response.json())
      .then((response) => {
        setDpiPrice(response[dpiTokenAddress?.toLowerCase() as string].usd)
        setMviPrice(response[mviTokenAddress?.toLowerCase() as string].usd)
        setBedPrice(response[bedTokenAddress?.toLowerCase() as string].usd)
        setGmiPrice(response[gmiTokenAddress?.toLowerCase() as string].usd)
        setEth2xfliPrice(
          response[eth2xfliTokenAddress?.toLowerCase() as string].usd
        )
        setBtc2xfliPrice(
          response[btc2xfliTokenAddress?.toLowerCase() as string].usd
        )
        setDataPrice(response[dataTokenAddress?.toLowerCase() as string].usd)
        setIndexPrice(response[indexTokenAddress?.toLowerCase() as string].usd)
      })
      .catch((error) => console.error(error))
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

    const totalTokenEmissionsPerDay = 0
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

    const totalTokenEmissionsPerDay = 109
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

  // GMI staking Emissions
  useMemo(() => {
    if (
      !indexPrice ||
      !gmiPrice ||
      !ethereum ||
      !gmiRewardsForDuration ||
      !gmiTotalSupply ||
      (!gmiRewardsApy.eq(new BigNumber(0)) &&
        !gmiRewardsApy.eq(new BigNumber(Infinity)) &&
        !gmiRewardsApy.eq(new BigNumber(NaN)))
    )
      return

    getRewardsForDuration(ethereum).then((res) =>
      setGmiRewardsForDuration(res.multipliedBy(new BigNumber(indexPrice)))
    )
    getTotalSupply(ethereum).then((res) =>
      setGmiTotalSupply(res.multipliedBy(new BigNumber(gmiPrice)))
    )
    const apr = gmiRewardsForDuration
      .dividedBy(gmiTotalSupply)
      .multipliedBy(new BigNumber(1200))
    if (!Number.isNaN(apr) && apr.gt(new BigNumber(0))) setGmiRewardsApy(apr)
  }, [gmiTotalSupply, gmiRewardsApy, ethereum, gmiPrice, indexPrice])

  const totalUSDInFarms =
    Number(usdInEthMviPool || '0') + Number(usdInEthDpiPool || '0')

  return (
    <PricesContext.Provider
      value={{
        indexPrice,
        ethereumPrice,
        dpiPrice,
        mviPrice,
        bedPrice,
        gmiPrice,
        eth2xfliPrice,
        eth2xflipPrice,
        btc2xfliPrice,
        dataPrice,
        totalUSDInFarms,
        apy,
        farmTwoApy,
        mviRewardsApy,
        gmiRewardsApy: gmiRewardsApy.toFixed(2),
        iethflipPrice,
        imaticflipPrice,
        matic2xflipPrice,
      }}
    >
      {children}
    </PricesContext.Provider>
  )
}

export default PricesProvider

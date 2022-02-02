import React, { useCallback, useEffect, useState } from 'react'

import { provider } from 'web3-core'

import {
  bedTokenAddress,
  btc2xfliTokenAddress,
  daiTokenAddress,
  daiTokenPolygonAddress,
  dataTokenAddress,
  dataTokenPolygonAddress,
  dpiTokenAddress,
  dpiTokenPolygonAddress,
  eth2xflipTokenAddress,
  eth2xfliTokenAddress,
  farmTwoAddress,
  gmiStakingRewardsAddress,
  gmiTokenAddress,
  gmiTokenPolygonAddress,
  iethflipTokenAddress,
  imaticflipTokenAddress,
  indexTokenAddress,
  matic2xflipTokenAddress,
  mviStakingRewardsAddress,
  mviTokenAddress,
  mviTokenPolygonAddress,
  stakingRewardsAddress,
  uniswapEthDpiLpTokenAddress,
  uniswapEthMviLpTokenAddress,
  usdcTokenAddress,
  usdcTokenPolygonAddress,
  wethTokenPolygonAddress,
} from 'constants/ethContractAddresses'
import useWallet from 'hooks/useWallet'
import { getEarnedIndexTokenQuantity as getEarnedFarmTwoBalance } from 'index-sdk/farmTwo'
import { getEarnedIndexTokenQuantity as getGmiRewardsBalance } from 'index-sdk/gmiStaking'
import { getEarnedIndexTokenQuantity as getMviRewardsBalance } from 'index-sdk/mviStaking'
import { getEarnedIndexTokenQuantity } from 'index-sdk/stake'
import BigNumber from 'utils/bignumber'
import { MAINNET_CHAIN_DATA, POLYGON_CHAIN_DATA } from 'utils/connectors'
import { getBalance, getBigNumBalance, getEthBalance } from 'utils/index'

import Context from './Context'

const Provider: React.FC = ({ children }) => {
  const [ethBalance, setEthBalance] = useState<BigNumber>()
  const [indexBalance, setIndexBalance] = useState<BigNumber>()
  const [dpiBalance, setDpiBalance] = useState<BigNumber>()
  const [ethfliBalance, setEthFliBalance] = useState<BigNumber>()
  const [btcfliBalance, setBtcFliBalance] = useState<BigNumber>()
  const [mviBalance, setMviBalance] = useState<BigNumber>()
  const [daiBalance, setDaiBalance] = useState<BigNumber>()
  const [usdcBalance, setUsdcBalance] = useState<BigNumber>()
  const [bedBalance, setBedBalance] = useState<BigNumber>()
  const [dataBalance, setDataBalance] = useState<BigNumber>()
  const [gmiBalance, setGmiBalance] = useState<BigNumber>()

  // polygon balances
  const [wethBalancePolygon, setWethBalancePolygon] = useState<BigNumber>()
  const [dpiBalancePolygon, setDpiBalancePolygon] = useState<BigNumber>()
  const [ethflipBalance, setEthFlipBalance] = useState<BigNumber>()
  const [mviBalancePolygon, setMviBalancePolygon] = useState<BigNumber>()
  const [daiBalancePolygon, setDaiBalancePolygon] = useState<BigNumber>()
  const [usdcBalancePolygon, setUsdcBalancePolygon] = useState<BigNumber>()
  const [dataBalancePolygon, setDataBalancePolygon] = useState<BigNumber>()
  const [gmiBalancePolygon, setGmiBalancePolygon] = useState<BigNumber>()
  const [iethFlipBalance, setIEthFlipBalance] = useState<BigNumber>()
  const [maticFlipBalancePolygon, setMaticFlipBalance] = useState<BigNumber>()
  const [imaticFlipBalancePolygon, setIMaticFlipBalance] = useState<BigNumber>()

  // LP Tokens Balances
  const [uniswapEthDpiLpBalance, setUniswapEthDpiLpBalance] =
    useState<BigNumber>()
  const [uniswapEthMviLpBalance, setUniswapEthMviLpBalance] =
    useState<BigNumber>()

  // Legacy DPI LM Program
  const [stakedUniswapEthDpiLpBalance, setStakedUniswapEthDpiLpBalance] =
    useState<BigNumber>()
  const [unharvestedIndexBalance, setUnharvestedIndexBalance] =
    useState<BigNumber>()

  // Current DPI LM Program
  const [stakedFarmTwoBalance, setStakedFarmTwoBalance] = useState<BigNumber>()
  const [unharvestedFarmTwoBalance, setUnharvestedFarmTwoBalance] =
    useState<BigNumber>()

  // Current MVI LM Program
  const [stakedUniswapEthMviLpBalance, setStakedUniswapEthMviLpBalance] =
    useState<BigNumber>()
  const [unharvestedMviRewardsBalance, setUnharvestedMviRewardsBalance] =
    useState<BigNumber>()

  // GMI Staking Program
  const [stakedGmiBalance, setStakedGmiBalance] = useState<BigNumber>()
  const [unharvestedIndexFromGmiBalance, setUnharvestedIndexFromGmiBalance] =
    useState<BigNumber>()

  const { account, ethereum, status, chainId } = useWallet()

  const fetchBalances = useCallback(
    async (userAddress: string, provider: provider) => {
      if (
        !indexTokenAddress ||
        !dpiTokenAddress ||
        !dpiTokenPolygonAddress ||
        !eth2xfliTokenAddress ||
        !eth2xflipTokenAddress ||
        !btc2xfliTokenAddress ||
        !mviTokenAddress ||
        !mviTokenPolygonAddress ||
        !daiTokenAddress ||
        !daiTokenPolygonAddress ||
        !usdcTokenAddress ||
        !usdcTokenPolygonAddress ||
        !bedTokenAddress ||
        !gmiTokenAddress ||
        !dataTokenAddress ||
        !dataTokenPolygonAddress ||
        !gmiTokenPolygonAddress ||
        !uniswapEthDpiLpTokenAddress ||
        !uniswapEthMviLpTokenAddress ||
        !stakingRewardsAddress ||
        !gmiStakingRewardsAddress ||
        !farmTwoAddress ||
        !mviStakingRewardsAddress ||
        !wethTokenPolygonAddress ||
        !iethflipTokenAddress ||
        !matic2xflipTokenAddress ||
        !imaticflipTokenAddress
      ) {
        throw new Error(
          'A token address is not defined. Please check your .env to confirm all token addresses are defined.'
        )
      }
      if (chainId && chainId === MAINNET_CHAIN_DATA.chainId) {
        const balances = await Promise.all([
          getEthBalance(provider, userAddress),
          getBalance(provider, indexTokenAddress, userAddress),
          getBalance(provider, dpiTokenAddress, userAddress),
          getBalance(provider, eth2xfliTokenAddress, userAddress),
          getBalance(provider, btc2xfliTokenAddress, userAddress),
          getBalance(provider, mviTokenAddress, userAddress),
          getBalance(provider, daiTokenAddress, userAddress),
          getBalance(provider, usdcTokenAddress, userAddress),
          getBalance(provider, bedTokenAddress, userAddress),
          getBalance(provider, dataTokenAddress, userAddress),
          getBalance(provider, gmiTokenAddress, userAddress),

          // LP Token Balances
          getBalance(provider, uniswapEthDpiLpTokenAddress, userAddress),
          getBalance(provider, uniswapEthMviLpTokenAddress, userAddress),

          // Legacy DPI LM Program Balances
          getBalance(provider, stakingRewardsAddress, userAddress),
          getEarnedIndexTokenQuantity(provider, userAddress),

          // Current DPI LM Program Balances
          getBalance(provider, farmTwoAddress, userAddress),
          getEarnedFarmTwoBalance(provider, userAddress),

          // GMI staking Balances
          getBalance(provider, gmiStakingRewardsAddress, userAddress),
          getGmiRewardsBalance(provider, userAddress),
        ])
        // Current MVI LM Program Balances
        const balances2 = await Promise.all([
          getBigNumBalance(provider, mviStakingRewardsAddress, userAddress),
          getMviRewardsBalance(provider, userAddress),
        ])

        // mainnet
        setEthBalance(new BigNumber(balances[0]))
        setIndexBalance(new BigNumber(balances[1]))
        setDpiBalance(new BigNumber(balances[2]))
        setEthFliBalance(new BigNumber(balances[3]))
        setBtcFliBalance(new BigNumber(balances[4]))
        setMviBalance(new BigNumber(balances[5]))
        setDaiBalance(new BigNumber(balances[6]))
        setUsdcBalance(new BigNumber(balances[7]))
        setBedBalance(new BigNumber(balances[8]))
        setDataBalance(new BigNumber(balances[9]))
        setGmiBalance(new BigNumber(balances[10]))
        setUniswapEthDpiLpBalance(new BigNumber(balances[11]))
        setUniswapEthMviLpBalance(new BigNumber(balances[12]))
        setStakedUniswapEthDpiLpBalance(new BigNumber(balances[13]))
        setUnharvestedIndexBalance(new BigNumber(balances[14]))
        setStakedFarmTwoBalance(new BigNumber(balances[15]))
        setUnharvestedFarmTwoBalance(new BigNumber(balances[16]))

        setStakedGmiBalance(new BigNumber(balances[17]))
        setUnharvestedIndexFromGmiBalance(new BigNumber(balances[18]))

        // BN Balances
        setStakedUniswapEthMviLpBalance(balances2[0])
        setUnharvestedMviRewardsBalance(balances2[1])
      } else if (chainId && chainId === POLYGON_CHAIN_DATA.chainId) {
        const balances = await Promise.all([
          //polygon
          getBalance(provider, wethTokenPolygonAddress, userAddress),
          getBalance(provider, dpiTokenPolygonAddress, userAddress),
          getBalance(provider, eth2xflipTokenAddress, userAddress),
          getBalance(provider, mviTokenPolygonAddress, userAddress),
          getBalance(provider, daiTokenPolygonAddress, userAddress),
          getBalance(provider, usdcTokenPolygonAddress, userAddress),
          getBalance(provider, dataTokenPolygonAddress, userAddress),
          getBalance(provider, gmiTokenPolygonAddress, userAddress),
          getBalance(provider, iethflipTokenAddress, userAddress),
          getBalance(provider, imaticflipTokenAddress, userAddress),
          getBalance(provider, matic2xflipTokenAddress, userAddress),
        ])

        // polygon
        setWethBalancePolygon(new BigNumber(balances[0]))
        setDpiBalancePolygon(new BigNumber(balances[1]))
        setEthFlipBalance(new BigNumber(balances[2]))
        setMviBalancePolygon(new BigNumber(balances[3]))
        setDaiBalancePolygon(new BigNumber(balances[4]))
        setUsdcBalancePolygon(new BigNumber(balances[5]))
        setDataBalancePolygon(new BigNumber(balances[6]))
        setGmiBalancePolygon(new BigNumber(balances[7]))
        setIEthFlipBalance(new BigNumber(balances[8]))
        setIMaticFlipBalance(new BigNumber(balances[9]))
        setMaticFlipBalance(new BigNumber(balances[10]))
      }
    },
    [
      chainId,
      setEthBalance,
      setWethBalancePolygon,
      setIndexBalance,
      setDpiBalance,
      setEthFliBalance,
      setEthFlipBalance,
      setBtcFliBalance,
      setMviBalance,
      setBedBalance,
      setGmiBalance,
      setDataBalance,
      setDataBalancePolygon,
      setGmiBalancePolygon,
      setUniswapEthDpiLpBalance,
      setUniswapEthMviLpBalance,
      setStakedUniswapEthDpiLpBalance,
      setUnharvestedIndexBalance,
      setStakedFarmTwoBalance,
      setUnharvestedFarmTwoBalance,
      setStakedUniswapEthMviLpBalance,
      setUnharvestedMviRewardsBalance,
      setStakedGmiBalance,
      setUnharvestedIndexFromGmiBalance,
      setMaticFlipBalance,
      setIMaticFlipBalance,
      setIEthFlipBalance,
    ]
  )

  useEffect(() => {
    if (status !== 'connected') {
      setEthBalance(new BigNumber(0))
      setWethBalancePolygon(new BigNumber(0))
      setIndexBalance(new BigNumber(0))
      setDpiBalance(new BigNumber(0))
      setDpiBalancePolygon(new BigNumber(0))
      setEthFliBalance(new BigNumber(0))
      setEthFlipBalance(new BigNumber(0))
      setBtcFliBalance(new BigNumber(0))
      setMviBalance(new BigNumber(0))
      setMviBalancePolygon(new BigNumber(0))
      setBedBalance(new BigNumber(0))
      setGmiBalance(new BigNumber(0))
      setDaiBalance(new BigNumber(0))
      setDaiBalancePolygon(new BigNumber(0))
      setUsdcBalance(new BigNumber(0))
      setUsdcBalancePolygon(new BigNumber(0))
      setUniswapEthDpiLpBalance(new BigNumber(0))
      setUniswapEthMviLpBalance(new BigNumber(0))
      setStakedUniswapEthDpiLpBalance(new BigNumber(0))
      setUnharvestedIndexBalance(new BigNumber(0))
      setStakedFarmTwoBalance(new BigNumber(0))
      setUnharvestedFarmTwoBalance(new BigNumber(0))
      setStakedUniswapEthMviLpBalance(new BigNumber(0))
      setUnharvestedMviRewardsBalance(new BigNumber(0))
      setDataBalance(new BigNumber(0))
      setDataBalancePolygon(new BigNumber(0))
      setStakedGmiBalance(new BigNumber(0))
      setUnharvestedIndexFromGmiBalance(new BigNumber(0))
      setGmiBalancePolygon(new BigNumber(0))
      setMaticFlipBalance(new BigNumber(0))
      setIMaticFlipBalance(new BigNumber(0))
      setIEthFlipBalance(new BigNumber(0))
    }
  }, [status])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalances(account, ethereum)
      let refreshInterval = setInterval(
        () => fetchBalances(account, ethereum),
        10000
      )
      return () => clearInterval(refreshInterval)
    }
  }, [account, ethereum, fetchBalances])

  return (
    <Context.Provider
      value={{
        ethBalance,
        wethBalancePolygon,
        indexBalance,
        dpiBalance,
        dpiBalancePolygon,
        ethfliBalance,
        ethflipBalance,
        btcfliBalance,
        mviBalance,
        mviBalancePolygon,
        daiBalance,
        daiBalancePolygon,
        usdcBalance,
        usdcBalancePolygon,
        bedBalance,
        gmiBalance,
        dataBalance,
        dataBalancePolygon,
        uniswapEthDpiLpBalance,
        uniswapEthMviLpBalance,
        stakedUniswapEthDpiLpBalance,
        unharvestedIndexBalance,
        stakedFarmTwoBalance,
        unharvestedFarmTwoBalance,
        stakedUniswapEthMviLpBalance,
        unharvestedMviRewardsBalance,
        stakedGmiBalance,
        unharvestedIndexFromGmiBalance,
        gmiBalancePolygon,
        maticFlipBalancePolygon,
        imaticFlipBalancePolygon,
        iethFlipBalance,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Provider

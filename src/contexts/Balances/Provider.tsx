import React, { useCallback, useEffect, useState } from 'react'
import BigNumber from 'utils/bignumber'
import { provider } from 'web3-core'

import Context from './Context'
import useWallet from 'hooks/useWallet'
import { getBalance, getEthBalance, getTotalSupply } from 'utils/index'
import { getEarnedIndexTokenQuantity } from 'index-sdk/stake'
import { getEarnedIndexTokenQuantity as getEarnedFarmTwoBalance } from 'index-sdk/farmTwo'
import { getEarnedIndexTokenQuantity as getMviRewardsBalance } from 'index-sdk/mviStaking'
import {
  dpiTokenAddress,
  eth2xfliTokenAddress,
  btc2xfliTokenAddress,
  mviTokenAddress,
  indexTokenAddress,
  daiTokenAddress,
  usdcTokenAddress,
  uniswapEthDpiLpTokenAddress,
  uniswapEthMviLpTokenAddress,
  stakingRewardsAddress,
  farmTwoAddress,
  mviStakingRewardsAddress,
  bedTokenAddress,
} from 'constants/ethContractAddresses'

const Provider: React.FC = ({ children }) => {
  const [ethBalance, setEthBalance] = useState<BigNumber>()
  const [indexBalance, setIndexBalance] = useState<BigNumber>()
  const [dpiBalance, setDpiBalance] = useState<BigNumber>()
  const [dpiTotalSupply, setDpiTotalSupply] = useState<BigNumber>()
  const [ethfliBalance, setEthFliBalance] = useState<BigNumber>()
  const [ethfliTotalSupply, setEthFliTotalSupply] = useState<BigNumber>()
  const [btcfliBalance, setBtcFliBalance] = useState<BigNumber>()
  const [btcfliTotalSupply, setBtcFliTotalSupply] = useState<BigNumber>()
  const [mviBalance, setMviBalance] = useState<BigNumber>()
  const [mviTotalSupply, setMviTotalSupply] = useState<BigNumber>()
  const [daiBalance, setDaiBalance] = useState<BigNumber>()
  const [usdcBalance, setUsdcBalance] = useState<BigNumber>()
  const [bedBalance, setBedBalance] = useState<BigNumber>()
  const [bedTotalSupply, setBedTotalSupply] = useState<BigNumber>()

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

  const {
    account,
    ethereum,
    status,
  }: {
    account: string | null | undefined
    ethereum: provider
    status: string
  } = useWallet()

  const fetchBalances = useCallback(
    async (userAddress: string, provider: provider) => {
      const balances = await Promise.all([
        getEthBalance(provider, userAddress),
        getBalance(provider, indexTokenAddress as string, userAddress),
        getBalance(provider, dpiTokenAddress as string, userAddress),
        getBalance(provider, eth2xfliTokenAddress as string, userAddress),
        getBalance(provider, btc2xfliTokenAddress as string, userAddress),
        getBalance(provider, mviTokenAddress as string, userAddress),
        getBalance(provider, daiTokenAddress as string, userAddress),
        getBalance(provider, usdcTokenAddress as string, userAddress),
        getBalance(provider, bedTokenAddress as string, userAddress),

        // LP Token Balances
        getBalance(
          provider,
          uniswapEthDpiLpTokenAddress as string,
          userAddress
        ),
        getBalance(
          provider,
          uniswapEthMviLpTokenAddress as string,
          userAddress
        ),

        // Legacy DPI LM Program Balances
        getBalance(provider, stakingRewardsAddress as string, userAddress),
        getEarnedIndexTokenQuantity(provider, userAddress),

        // Current DPI LM Program Balances
        getBalance(provider, farmTwoAddress as string, userAddress),
        getEarnedFarmTwoBalance(provider, userAddress),

        // Current MVI LM Program Balances
        getBalance(provider, mviStakingRewardsAddress as string, userAddress),
        getMviRewardsBalance(provider, userAddress),
      ])

      setEthBalance(
        new BigNumber(balances[0]).dividedBy(new BigNumber(10).pow(18))
      )
      setIndexBalance(
        new BigNumber(balances[1]).dividedBy(new BigNumber(10).pow(18))
      )
      setDpiBalance(
        new BigNumber(balances[2]).dividedBy(new BigNumber(10).pow(18))
      )
      setEthFliBalance(
        new BigNumber(balances[3]).dividedBy(new BigNumber(10).pow(18))
      )
      setBtcFliBalance(
        new BigNumber(balances[4]).dividedBy(new BigNumber(10).pow(18))
      )
      setMviBalance(
        new BigNumber(balances[5]).dividedBy(new BigNumber(10).pow(18))
      )
      setDaiBalance(
        new BigNumber(balances[6]).dividedBy(new BigNumber(10).pow(18))
      )
      setUsdcBalance(
        new BigNumber(balances[7]).dividedBy(new BigNumber(10).pow(6))
      )
      setBedBalance(
        new BigNumber(balances[8]).dividedBy(new BigNumber(10).pow(18))
      )
      setUniswapEthDpiLpBalance(
        new BigNumber(balances[9]).dividedBy(new BigNumber(10).pow(18))
      )
      setUniswapEthMviLpBalance(
        new BigNumber(balances[10]).dividedBy(new BigNumber(10).pow(18))
      )
      setStakedUniswapEthDpiLpBalance(
        new BigNumber(balances[11]).dividedBy(new BigNumber(10).pow(18))
      )
      setUnharvestedIndexBalance(
        new BigNumber(balances[12]).dividedBy(new BigNumber(10).pow(18))
      )
      setStakedFarmTwoBalance(
        new BigNumber(balances[13]).dividedBy(new BigNumber(10).pow(18))
      )
      setUnharvestedFarmTwoBalance(
        new BigNumber(balances[14]).dividedBy(new BigNumber(10).pow(18))
      )
      setStakedUniswapEthMviLpBalance(
        new BigNumber(balances[15]).dividedBy(new BigNumber(10).pow(18))
      )
      setUnharvestedMviRewardsBalance(
        new BigNumber(balances[16]).dividedBy(new BigNumber(10).pow(18))
      )
    },
    [
      setEthBalance,
      setIndexBalance,
      setDpiBalance,
      setEthFliBalance,
      setBtcFliBalance,
      setMviBalance,
      setBedBalance,
      setUniswapEthDpiLpBalance,
      setUniswapEthMviLpBalance,
      setStakedUniswapEthDpiLpBalance,
      setUnharvestedIndexBalance,
      setStakedFarmTwoBalance,
      setUnharvestedFarmTwoBalance,
      setStakedUniswapEthMviLpBalance,
      setUnharvestedMviRewardsBalance,
    ]
  )

  const fetchTotalSupplies = useCallback(
    async (provider: provider) => {
      const totalSupplies = await Promise.all([
        getTotalSupply(provider, eth2xfliTokenAddress as string),
        getTotalSupply(provider, btc2xfliTokenAddress as string),
        getTotalSupply(provider, dpiTokenAddress as string),
        getTotalSupply(provider, mviTokenAddress as string),
        getTotalSupply(provider, bedTokenAddress as string),
      ])

      setEthFliTotalSupply(
        new BigNumber(totalSupplies[0]).dividedBy(new BigNumber(10).pow(18))
      )
      setBtcFliTotalSupply(
        new BigNumber(totalSupplies[1]).dividedBy(new BigNumber(10).pow(18))
      )
      setDpiTotalSupply(
        new BigNumber(totalSupplies[2]).dividedBy(new BigNumber(10).pow(18))
      )
      setMviTotalSupply(
        new BigNumber(totalSupplies[3]).dividedBy(new BigNumber(10).pow(18))
      )
      setBedTotalSupply(
        new BigNumber(totalSupplies[4]).dividedBy(new BigNumber(10).pow(18))
      )
    },
    [
      setEthFliTotalSupply,
      setBtcFliTotalSupply,
      setDpiTotalSupply,
      setMviTotalSupply,
      setBedTotalSupply,
    ]
  )

  useEffect(() => {
    if (status !== 'connected') {
      setEthBalance(new BigNumber(0))
      setIndexBalance(new BigNumber(0))
      setDpiBalance(new BigNumber(0))
      setEthFliBalance(new BigNumber(0))
      setBtcFliBalance(new BigNumber(0))
      setMviBalance(new BigNumber(0))
      setBedBalance(new BigNumber(0))
      setDaiBalance(new BigNumber(0))
      setUsdcBalance(new BigNumber(0))
      setUniswapEthDpiLpBalance(new BigNumber(0))
      setUniswapEthMviLpBalance(new BigNumber(0))
      setStakedUniswapEthDpiLpBalance(new BigNumber(0))
      setUnharvestedIndexBalance(new BigNumber(0))
      setStakedFarmTwoBalance(new BigNumber(0))
      setUnharvestedFarmTwoBalance(new BigNumber(0))
      setStakedUniswapEthMviLpBalance(new BigNumber(0))
      setUnharvestedMviRewardsBalance(new BigNumber(0))
    }
  }, [status])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalances(account, ethereum)
      fetchTotalSupplies(ethereum)
      let refreshInterval = setInterval(
        () => fetchBalances(account, ethereum),
        10000
      )
      return () => clearInterval(refreshInterval)
    }
  }, [account, ethereum, fetchBalances, fetchTotalSupplies])

  return (
    <Context.Provider
      value={{
        ethBalance,
        indexBalance,
        dpiBalance,
        ethfliBalance,
        btcfliBalance,
        mviBalance,
        daiBalance,
        usdcBalance,
        bedBalance,
        uniswapEthDpiLpBalance,
        uniswapEthMviLpBalance,
        stakedUniswapEthDpiLpBalance,
        unharvestedIndexBalance,
        stakedFarmTwoBalance,
        unharvestedFarmTwoBalance,
        stakedUniswapEthMviLpBalance,
        unharvestedMviRewardsBalance,
        dpiTotalSupply,
        ethfliTotalSupply,
        btcfliTotalSupply,
        mviTotalSupply,
        bedTotalSupply,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Provider

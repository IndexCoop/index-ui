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
  dataTokenAddress,
} from 'constants/ethContractAddresses'

const Provider: React.FC = ({ children }) => {
  const [ethBalance, setEthBalance] = useState<string>()
  const [indexBalance, setIndexBalance] = useState<string>()
  const [dpiBalance, setDpiBalance] = useState<string>()
  const [dpiTotalSupply, setDpiTotalSupply] = useState<BigNumber>()
  const [ethfliBalance, setEthFliBalance] = useState<string>()
  const [ethfliTotalSupply, setEthFliTotalSupply] = useState<BigNumber>()
  const [btcfliBalance, setBtcFliBalance] = useState<string>()
  const [btcfliTotalSupply, setBtcFliTotalSupply] = useState<BigNumber>()
  const [mviBalance, setMviBalance] = useState<string>()
  const [mviTotalSupply, setMviTotalSupply] = useState<BigNumber>()
  const [daiBalance, setDaiBalance] = useState<string>()
  const [usdcBalance, setUsdcBalance] = useState<string>()
  const [bedBalance, setBedBalance] = useState<string>()
  const [bedTotalSupply, setBedTotalSupply] = useState<BigNumber>()
  const [dataBalance, setDataBalance] = useState<BigNumber>()
  const [dataTotalSupply, setDataTotalSupply] = useState<BigNumber>()

  // LP Tokens Balances
  const [uniswapEthDpiLpBalance, setUniswapEthDpiLpBalance] = useState<string>()
  const [uniswapEthMviLpBalance, setUniswapEthMviLpBalance] = useState<string>()

  // Legacy DPI LM Program
  const [stakedUniswapEthDpiLpBalance, setStakedUniswapEthDpiLpBalance] =
    useState<string>()
  const [unharvestedIndexBalance, setUnharvestedIndexBalance] =
    useState<string>()

  // Current DPI LM Program
  const [stakedFarmTwoBalance, setStakedFarmTwoBalance] = useState<string>()
  const [unharvestedFarmTwoBalance, setUnharvestedFarmTwoBalance] =
    useState<string>()

  // Current MVI LM Program
  const [stakedUniswapEthMviLpBalance, setStakedUniswapEthMviLpBalance] =
    useState<string>()
  const [unharvestedMviRewardsBalance, setUnharvestedMviRewardsBalance] =
    useState<string>()

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
        getBalance(provider, dataTokenAddress as string, userAddress),

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

      setEthBalance(balances[0])
      setIndexBalance(balances[1])
      setDpiBalance(balances[2])
      setEthFliBalance(balances[3])
      setBtcFliBalance(balances[4])
      setMviBalance(balances[5])
      setDaiBalance(balances[6])
      setUsdcBalance(balances[7]) // .dividedBy(10).pow(6))
      setBedBalance(balances[8])
      setUniswapEthDpiLpBalance(balances[9])
      setUniswapEthMviLpBalance(balances[10])
      setStakedUniswapEthDpiLpBalance(balances[11])
      setUnharvestedIndexBalance(balances[12])
      setStakedFarmTwoBalance(balances[13])
      setUnharvestedFarmTwoBalance(balances[14])
      setStakedUniswapEthMviLpBalance(balances[15])
      setUnharvestedMviRewardsBalance(balances[16])
    },
    [
      setEthBalance,
      setIndexBalance,
      setDpiBalance,
      setEthFliBalance,
      setBtcFliBalance,
      setMviBalance,
      setBedBalance,
      setDataBalance,
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
        getTotalSupply(provider, dataTokenAddress as string),
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
      setDataTotalSupply(
        new BigNumber(totalSupplies[5]).dividedBy(new BigNumber(10).pow(18))
      )
    },
    [
      setEthFliTotalSupply,
      setBtcFliTotalSupply,
      setDpiTotalSupply,
      setMviTotalSupply,
      setBedTotalSupply,
      setDataTotalSupply,
    ]
  )

  useEffect(() => {
    if (status !== 'connected') {
      setEthBalance('0')
      setIndexBalance('0')
      setDpiBalance('0')
      setEthFliBalance('0')
      setBtcFliBalance('0')
      setMviBalance('0')
      setBedBalance('0')
      setDaiBalance('0')
      setUsdcBalance('0')
      setUniswapEthDpiLpBalance('0')
      setUniswapEthMviLpBalance('0')
      setStakedUniswapEthDpiLpBalance('0')
      setUnharvestedIndexBalance('0')
      setStakedFarmTwoBalance('0')
      setUnharvestedFarmTwoBalance('0')
      setStakedUniswapEthMviLpBalance('0')
      setUnharvestedMviRewardsBalance('0')
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
        dataBalance,
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
        dataTotalSupply,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Provider

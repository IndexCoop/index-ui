import React, { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { provider } from 'web3-core'

import Context from './Context'
import useWallet from 'hooks/useWallet'
import { getBalance } from 'utils/index'
import { getEarnedIndexTokenQuantity } from 'index-sdk/stake';
import {
  dpiTokenAddress,
  indexTokenAddress,
  uniswapEthDpiLpTokenAddress,
  stakingRewardsAddress,
} from 'constants/tokenAddresses'

const Provider: React.FC = ({ children }) => {
  const [indexBalance, setIndexBalance] = useState<BigNumber>()
  const [dpiBalance, setDpiBalance] = useState<BigNumber>()
  const [uniswapEthDpiLpBalance, setUniswapEthDpiLpBalance] = useState<BigNumber>()
  const [stakedUniswapEthDpiLpBalance, setStakedUniswapEthDpiLpBalance] = useState<BigNumber>()
  const [unharvestedIndexBalance, setUnharvestedIndexBalance] = useState<BigNumber>()

  const {
    account,
    ethereum,
    status
  }: { account: string | null | undefined; ethereum: provider; status: string } = useWallet()

  const fetchBalances = useCallback(
    async (userAddress: string, provider: provider) => {
      const balances = await Promise.all([
        getBalance(provider, indexTokenAddress as string, userAddress),
        getBalance(provider, dpiTokenAddress as string, userAddress),
        getBalance(
          provider,
          uniswapEthDpiLpTokenAddress as string,
          userAddress
        ),
        getBalance(provider, stakingRewardsAddress as string, userAddress),
        getEarnedIndexTokenQuantity(provider, userAddress),
      ])

      setIndexBalance(
        new BigNumber(balances[0]).dividedBy(new BigNumber(10).pow(18))
      )
      setDpiBalance(
        new BigNumber(balances[1]).dividedBy(new BigNumber(10).pow(18))
      )
      setUniswapEthDpiLpBalance(
        new BigNumber(balances[2]).dividedBy(new BigNumber(10).pow(18))
      )
      setStakedUniswapEthDpiLpBalance(
        new BigNumber(balances[3]).dividedBy(new BigNumber(10).pow(18))
      )
      setUnharvestedIndexBalance(
        new BigNumber(balances[4]).dividedBy(new BigNumber(10).pow(18))
      )
    },
    [
      setIndexBalance,
      setDpiBalance,
      setUniswapEthDpiLpBalance,
      setStakedUniswapEthDpiLpBalance,
      setUnharvestedIndexBalance,
    ]
  )

  useEffect(() => {
    if (account && ethereum) {
      fetchBalances(account, ethereum)
    }

    if (status !== 'connected') {
      setIndexBalance(new BigNumber(0))
      setDpiBalance(new BigNumber(0))
      setUniswapEthDpiLpBalance(new BigNumber(0))
      setStakedUniswapEthDpiLpBalance(new BigNumber(0))
      setUnharvestedIndexBalance(new BigNumber(0))

    }
  }, [account, ethereum, status, fetchBalances])

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
        indexBalance,
        dpiBalance,
        uniswapEthDpiLpBalance,
        stakedUniswapEthDpiLpBalance,
        unharvestedIndexBalance
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Provider

import React, { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import {
  yamv2 as yamV2Address,
  yamv3 as yamV3Address,
  yycrvUniLp as yyrcvUniLpAddress,
} from 'constants/tokenAddresses'
import { getBalance } from 'utils'

import Context from './Context'

const Provider: React.FC = ({ children }) => {
  const [yamV2Balance, setYamV2Balance] = useState<BigNumber>()
  const [yamV3Balance, setYamV3Balance] = useState<BigNumber>()
  const [yycrvUniLpBalance, setYycrvUniLpBalance] = useState<BigNumber>()

  const { account, ethereum }: { account: string | null, ethereum: provider } = useWallet()

  const fetchBalances = useCallback(async (userAddress: string, provider: provider) => {
    const balances = await Promise.all([
      await getBalance(provider, yamV2Address, userAddress),
      await getBalance(provider, yamV3Address, userAddress),
      await getBalance(provider, yyrcvUniLpAddress, userAddress)
    ])
    setYamV2Balance(new BigNumber(balances[0]).dividedBy(new BigNumber(10).pow(24)))
    setYamV3Balance(new BigNumber(balances[1]).dividedBy(new BigNumber(10).pow(18)))
    setYycrvUniLpBalance(new BigNumber(balances[2]).dividedBy(new BigNumber(10).pow(18)))
  }, [
    setYamV2Balance,
    setYamV3Balance,
    setYycrvUniLpBalance
  ])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalances(account, ethereum)
    }
  }, [
    account,
    ethereum,
    fetchBalances,
  ])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalances(account, ethereum)
      let refreshInterval = setInterval(() => fetchBalances(account, ethereum), 10000)
      return () => clearInterval(refreshInterval)
    }
  }, [
    account,
    ethereum,
    fetchBalances,
  ])

  return (
    <Context.Provider value={{
      yamV2Balance,
      yamV3Balance,
      yycrvUniLpBalance,
    }}>
      {children}
    </Context.Provider>
  )
}

export default Provider
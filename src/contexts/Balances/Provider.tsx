import React, { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import Context from './Context'

const Provider: React.FC = ({ children }) => {
  const [yamV2Balance, setYamV2Balance] = useState<BigNumber>()
  const [yamV3Balance, setYamV3Balance] = useState<BigNumber>()
  const [yycrvUniLpBalance, setYycrvUniLpBalance] = useState<BigNumber>()

  const { account, ethereum }: { account: string | null, ethereum: provider } = useWallet()

  const fetchBalances = useCallback(async (userAddress: string, provider: provider) => {
    setYamV2Balance(new BigNumber(0).dividedBy(new BigNumber(10).pow(24)))
    setYamV3Balance(new BigNumber(0).dividedBy(new BigNumber(10).pow(18)))
    setYycrvUniLpBalance(new BigNumber(0).dividedBy(new BigNumber(10).pow(18)))
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
import React, { useState, useEffect } from 'react'
import { provider } from 'web3-core'
import BigNumber from 'utils/bignumber'

import TotalSupplyContext from './Btc2xFliTokenSupplyCapContext'
import useWallet from 'hooks/useWallet'
import { getSupplyCap } from 'utils'
import { btc2xfliSuppyCapAddress } from 'constants/ethContractAddresses'

const Btc2xFliTokenSupplyCapProvider: React.FC = ({ children }) => {
  const { account, ethereum } = useWallet()
  const [btcFliSupplyCap, setBtcFliSupplyCap] = useState<BigNumber>()

  const fetchSupplyCap = async (address: string, provider: provider) => {
    const cap = await getSupplyCap(address, provider)
    setBtcFliSupplyCap(new BigNumber(cap).dividedBy(new BigNumber(10).pow(18)))
  }

  useEffect(() => {
    if (account && ethereum) {
      fetchSupplyCap(btc2xfliSuppyCapAddress as string, ethereum)
    }
  }, [ethereum, account])

  return (
    <TotalSupplyContext.Provider
      value={{
        btcfliSupplyCap: btcFliSupplyCap,
      }}
    >
      {children}
    </TotalSupplyContext.Provider>
  )
}
export default Btc2xFliTokenSupplyCapProvider

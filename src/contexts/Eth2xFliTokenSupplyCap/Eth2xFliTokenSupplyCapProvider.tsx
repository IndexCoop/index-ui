import React, { useState, useEffect } from 'react'
import { provider } from 'web3-core'
import BigNumber from 'utils/bignumber'

import TotalSupplyContext from './Eth2xFliTokenSupplyCapContext'
import useWallet from 'hooks/useWallet'
import { getSupplyCap } from 'utils'
import { eth2xfliSuppyCapAddress } from 'constants/ethContractAddresses'

const Eth2xFliTokenSupplyCapProvider: React.FC = ({ children }) => {
  const { account, ethereum } = useWallet()
  const [ethFliSupplyCap, setEthFliSupplyCap] = useState<BigNumber>()

  const fetchSupplyCap = async (address: string, provider: provider) => {
    const cap = await getSupplyCap(address, provider)
    setEthFliSupplyCap(new BigNumber(cap).dividedBy(new BigNumber(10).pow(18)))
  }

  useEffect(() => {
    if (account && ethereum) {
      fetchSupplyCap(eth2xfliSuppyCapAddress as string, ethereum)
    }
  }, [ethereum, account])

  return (
    <TotalSupplyContext.Provider
      value={{
        ethfliSupplyCap: ethFliSupplyCap,
      }}
    >
      {children}
    </TotalSupplyContext.Provider>
  )
}
export default Eth2xFliTokenSupplyCapProvider

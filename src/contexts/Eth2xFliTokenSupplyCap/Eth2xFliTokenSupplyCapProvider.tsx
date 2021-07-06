import React, { useState, useEffect } from 'react'
import TotalSupplyContext from './Eth2xFliTokenSupplyCapContext'
import { getSupplyCap } from 'utils'
import { eth2xfliSuppyCapAddress } from 'constants/ethContractAddresses'
import useWallet from 'hooks/useWallet'
import SupplyCapIssuanceABI from 'index-sdk/abi/SupplyCapIssuanceHook.json'
import { AbiItem } from 'web3-utils'
import { provider } from 'web3-core'
import BigNumber from 'utils/bignumber'

const Eth2xFliTokenSupplyCapProvider: React.FC = ({ children }) => {
  const { account, ethereum } = useWallet()
  const [ethFliSupplyCap, setEthFliSupplyCap] = useState<BigNumber>()

  const fetchSupplyCap = async (
    address: string,
    abi: AbiItem,
    provider: provider
  ) => {
    const cap = await getSupplyCap(address, abi, provider)
    setEthFliSupplyCap(new BigNumber(cap).dividedBy(new BigNumber(10).pow(18)))
  }

  useEffect(() => {
    if (account && ethereum) {
      fetchSupplyCap(
        eth2xfliSuppyCapAddress as string,
        SupplyCapIssuanceABI as unknown as AbiItem,
        ethereum
      )
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

import React, { useState, useEffect } from 'react'
import TotalSupplyContext from './Btc2xFliTokenSupplyCapContext'
import { getSupplyCap } from 'utils'
import { btc2xfliSuppyCapAddress } from 'constants/ethContractAddresses'
import useWallet from 'hooks/useWallet'
import SupplyCapIssuanceABI from 'index-sdk/abi/SupplyCapIssuanceHook.json'
import { AbiItem } from 'web3-utils'
import { provider } from 'web3-core'
import BigNumber from 'utils/bignumber'

const Btc2xFliTokenSupplyCapProvider: React.FC = ({ children }) => {
  const { account, ethereum } = useWallet()
  const [btcFliSupplyCap, setBtcFliSupplyCap] = useState(new BigNumber(0))

  const fetchSupplyCap = async (
    address: string,
    abi: AbiItem,
    provider: provider
  ) => {
    const cap = await getSupplyCap(address, abi, provider)
    setBtcFliSupplyCap(new BigNumber(cap).dividedBy(new BigNumber(10).pow(18)))
  }

  useEffect(() => {
    if (account && ethereum) {
      fetchSupplyCap(
        btc2xfliSuppyCapAddress as string,
        SupplyCapIssuanceABI as unknown as AbiItem,
        ethereum
      )
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

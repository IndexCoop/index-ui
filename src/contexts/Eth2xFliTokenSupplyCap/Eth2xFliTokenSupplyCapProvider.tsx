import React, { useState, useEffect, useCallback } from 'react'
import TotalSupplyContext from './Eth2xFliTokenSupplyCapContext'
import { getSupplyCap } from 'utils'

import useWallet from 'hooks/useWallet'
import SupplyCapIssuanceABI from './SupplyCapIssuanceHook.json'
import { AbiItem } from 'web3-utils'
import { provider } from 'web3-core'

const Eth2xFliTokenSupplyCapProvider: React.FC = ({ children }) => {
  const { account, ethereum } = useWallet()
  console.log('useWallet: ' + ethereum)

  const [ethFliSupplyCap, setEthFliSupplyCap] = useState('123')

  const fetchSupplyCap = async (
    address: string,
    abi: AbiItem,
    provider: provider
  ) => {
    const cap = await getSupplyCap(address, abi, provider)
    console.log('cap: ' + cap)
    setEthFliSupplyCap(cap)
  }

  useEffect(() => {
    console.log(ethereum)
    if (account && ethereum) {
      fetchSupplyCap(
        '0x0F1171C24B06ADed18d2d23178019A3B256401D3',
        SupplyCapIssuanceABI as unknown as AbiItem,
        ethereum
      )
      let refreshInterval = setInterval(
        () =>
          fetchSupplyCap(
            '0x0F1171C24B06ADed18d2d23178019A3B256401D3',
            SupplyCapIssuanceABI as unknown as AbiItem,
            ethereum
          ),
        10000
      )
      return () => clearInterval(refreshInterval)
    }
    console.log('useEffect fetch: ' + ethFliSupplyCap)
  }, [ethereum, account, fetchSupplyCap])

  const selectLatestSupplyCap = (supplyCap?: string) =>
    supplyCap ? supplyCap : '--'

  return (
    <TotalSupplyContext.Provider
      value={{
        ethfliSupplyCap: selectLatestSupplyCap(ethFliSupplyCap),
      }}
    >
      {children}
    </TotalSupplyContext.Provider>
  )
}
export default Eth2xFliTokenSupplyCapProvider

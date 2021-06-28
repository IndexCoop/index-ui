import React, { useState, useEffect, useCallback } from 'react'
import TotalSupplyContext from './Eth2xFliTokenTotalSupplyContext'
import { getTotalSupply } from 'utils'
import Web3 from 'web3'
import { provider } from 'web3-core'
import useWallet from 'hooks/useWallet'
import { ethers } from 'ethers'

const Eth2xFliTokenTotalSupplyProvider: React.FC = ({ children }) => {
  // // Trying out different things, keep getting undefined for provider
  // const { ethereum } = useWallet()
  // console.log('useWallet: ' + ethereum)
  // const [provider, setProvider] = useState<any>(ethereum)
  // console.log('provider: ' + provider)

  // const fetchProvider =
  //   async () => {
  //     const prov = await ethereum
  //     setProvider(prov)
  //     console.log('fetchProvider: ' + prov)
  //   }

  // const [totalSupplyEthFli, setTotalSupplyEthFli] = useState('123')

  // useEffect(() => {
  //   fetchProvider()
  //   console.log('useEffect: ' + provider)
  //   getTotalSupply(provider, '0x0F1171C24B06ADed18d2d23178019A3B256401D3')
  //     .then((response: any) => {
  //       setTotalSupplyEthFli(response)
  //     })
  //     .catch((error: any) => console.log(error))
  // }, [])

  const ethfliTestValue = '200'

  const selectLatestSupplyCap = (supplyCap?: string) =>
    supplyCap ? supplyCap : '--'

  return (
    <TotalSupplyContext.Provider
      value={{
        ethfliSupplyCap: selectLatestSupplyCap(ethfliTestValue),
      }}
    >
      {children}
    </TotalSupplyContext.Provider>
  )
}
export default Eth2xFliTokenTotalSupplyProvider

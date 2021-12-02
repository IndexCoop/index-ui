import React, { useState, useEffect } from 'react'
import { provider } from 'web3-core'
import BigNumber from 'bignumber.js'

import { getTokenSupply } from 'utils/setjsApi'
import useWallet from 'hooks/useWallet'
import {
  bedTokenAddress,
  btc2xfliTokenAddress,
  dataTokenAddress,
  dpiTokenAddress,
  eth2xfliTokenAddress,
  mviTokenAddress,
} from 'constants/ethContractAddresses'
import TokenSupplyContext from './TokenSupplyContext'
import { getProvider, getWeb3ReactProvider } from 'constants/provider'
import Web3 from 'web3'

const TokenSupplyProvider: React.FC = ({ children }) => {
  //const { ethereum }: { ethereum: provider } = useWallet()
  const [dpiTotalSupply, setDpiTotalSupply] = useState<BigNumber>()
  const [mviTotalSupply, setMviTotalSupply] = useState<BigNumber>()
  const [bedTotalSupply, setBedTotalSupply] = useState<BigNumber>()
  const [eth2xfliTotalSupply, setEth2xfliTotalSupply] = useState<BigNumber>()
  const [btc2xfliTotalSupply, setBtc2xfliTotalSupply] = useState<BigNumber>()
  const [dataTotalSupply, setDataTotalSupply] = useState<BigNumber>()
  //const provider = getProvider()
  const provider = getWeb3ReactProvider().currentProvider

  useEffect(() => {
    if (
      provider &&
      dpiTokenAddress &&
      mviTokenAddress &&
      bedTokenAddress &&
      eth2xfliTokenAddress &&
      btc2xfliTokenAddress &&
      dataTokenAddress
    ) {
      getTokenSupply(provider, [
        dpiTokenAddress,
        mviTokenAddress,
        bedTokenAddress,
        eth2xfliTokenAddress,
        btc2xfliTokenAddress,
        dataTokenAddress,
      ])
        .then((result) => {
          console.log('getTokenSupply.then', result)
          const [
            dpiResult,
            mviResult,
            bedResult,
            eth2xFliResult,
            btc2xFliResult,
            dataResult,
          ] = result
          setDpiTotalSupply(
            new BigNumber(dpiResult.totalSupply.toString()).dividedBy(
              new BigNumber(10).pow(18)
            )
          )
          setMviTotalSupply(
            new BigNumber(mviResult.totalSupply.toString()).dividedBy(
              new BigNumber(10).pow(18)
            )
          )
          setBedTotalSupply(
            new BigNumber(bedResult.totalSupply.toString()).dividedBy(
              new BigNumber(10).pow(18)
            )
          )
          setEth2xfliTotalSupply(
            new BigNumber(eth2xFliResult.totalSupply.toString()).dividedBy(
              new BigNumber(10).pow(18)
            )
          )
          setBtc2xfliTotalSupply(
            new BigNumber(btc2xFliResult.totalSupply.toString()).dividedBy(
              new BigNumber(10).pow(18)
            )
          )
          setDataTotalSupply(
            new BigNumber(dataResult.totalSupply.toString()).dividedBy(
              new BigNumber(10).pow(18)
            )
          )
        })
        .catch((error: any) => console.error(error))
    }
  }, [provider])

  return (
    <TokenSupplyContext.Provider
      value={{
        dpiTotalSupply: dpiTotalSupply,
        mviTotalSupply: mviTotalSupply,
        bedTotalSupply: bedTotalSupply,
        eth2xfliTotalSupply: eth2xfliTotalSupply,
        btc2xfliTotalSupply: btc2xfliTotalSupply,
        dataTotalSupply: dataTotalSupply,
      }}
    >
      {children}
    </TokenSupplyContext.Provider>
  )
}

export default TokenSupplyProvider

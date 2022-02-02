import React, { useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { provider } from 'web3-core'

import {
  bedTokenAddress,
  btc2xfliTokenAddress,
  dataTokenAddress,
  dpiTokenAddress,
  dpiTokenPolygonAddress,
  eth2xflipTokenAddress,
  eth2xfliTokenAddress,
  gmiTokenAddress,
  iethflipTokenAddress,
  imaticflipTokenAddress,
  matic2xflipTokenAddress,
  mviTokenAddress,
  mviTokenPolygonAddress,
} from 'constants/ethContractAddresses'
import useWallet from 'hooks/useWallet'
import { MAINNET_CHAIN_DATA, POLYGON_CHAIN_DATA } from 'utils/connectors'
import { getTokenSupply } from 'utils/setjsApi'

import TokenSupplyContext from './TokenSupplyContext'

const TokenSupplyProvider: React.FC = ({ children }) => {
  const [dpiTotalSupply, setDpiTotalSupply] = useState<BigNumber>()
  const [mviTotalSupply, setMviTotalSupply] = useState<BigNumber>()
  const [bedTotalSupply, setBedTotalSupply] = useState<BigNumber>()
  const [gmiTotalSupply, setGmiTotalSupply] = useState<BigNumber>()
  const [eth2xfliTotalSupply, setEth2xfliTotalSupply] = useState<BigNumber>()
  const [eth2xflipTotalSupply, setEth2xflipTotalSupply] = useState<BigNumber>()
  const [btc2xfliTotalSupply, setBtc2xfliTotalSupply] = useState<BigNumber>()
  const [dataTotalSupply, setDataTotalSupply] = useState<BigNumber>()
  const [matic2xflipTotalSupply, setMatic2xflipTotalSupply] =
    useState<BigNumber>()
  const [iethflipTotalSupply, setiEthflipTotalSupply] = useState<BigNumber>()
  const [imaticflipTotalSupply, setiMaticflipTotalSupply] =
    useState<BigNumber>()
  const { ethereum: provider, chainId } = useWallet()

  useEffect(() => {
    //mainnet
    if (
      chainId &&
      chainId === MAINNET_CHAIN_DATA.chainId &&
      provider &&
      dpiTokenAddress &&
      mviTokenAddress &&
      bedTokenAddress &&
      gmiTokenAddress &&
      eth2xfliTokenAddress &&
      btc2xfliTokenAddress &&
      dataTokenAddress
    ) {
      getTokenSupply(
        provider,
        [
          dpiTokenAddress,
          mviTokenAddress,
          bedTokenAddress,
          gmiTokenAddress,
          eth2xfliTokenAddress,
          btc2xfliTokenAddress,
          dataTokenAddress,
        ],
        chainId
      )
        .then((result) => {
          const [
            dpiResult,
            mviResult,
            bedResult,
            gmiResult,
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
          setGmiTotalSupply(
            new BigNumber(gmiResult.totalSupply.toString()).dividedBy(
              new BigNumber(10).pow(18)
            )
          )
          setEth2xfliTotalSupply(
            new BigNumber(eth2xFliResult.totalSupply.toString()).dividedBy(
              new BigNumber(10).pow(18)
            )
          )
          setEth2xflipTotalSupply(undefined)
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
    } else if (
      chainId &&
      chainId === POLYGON_CHAIN_DATA.chainId &&
      provider &&
      dpiTokenPolygonAddress &&
      mviTokenPolygonAddress &&
      eth2xflipTokenAddress &&
      iethflipTokenAddress &&
      matic2xflipTokenAddress &&
      imaticflipTokenAddress
    ) {
      getTokenSupply(
        provider,
        [
          dpiTokenPolygonAddress,
          mviTokenPolygonAddress,
          eth2xflipTokenAddress,
          iethflipTokenAddress,
          imaticflipTokenAddress,
          matic2xflipTokenAddress,
        ],
        chainId
      )
        .then((result) => {
          const [
            dpiResult,
            mviResult,
            eth2xFLIPResult,
            iethFLIPResult,
            imaticFLIPResult,
            matic2xFLIPResult,
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
          setEth2xflipTotalSupply(
            new BigNumber(eth2xFLIPResult.totalSupply.toString()).dividedBy(
              new BigNumber(10).pow(18)
            )
          )
          setiEthflipTotalSupply(
            new BigNumber(iethFLIPResult.totalSupply.toString()).dividedBy(
              new BigNumber(10).pow(18)
            )
          )
          setMatic2xflipTotalSupply(
            new BigNumber(matic2xFLIPResult.totalSupply.toString()).dividedBy(
              new BigNumber(10).pow(18)
            )
          )
          setiMaticflipTotalSupply(
            new BigNumber(imaticFLIPResult.totalSupply.toString()).dividedBy(
              new BigNumber(10).pow(18)
            )
          )

          setBedTotalSupply(undefined)
          setGmiTotalSupply(undefined)
          setEth2xfliTotalSupply(undefined)
          setBtc2xfliTotalSupply(undefined)
          setDataTotalSupply(undefined)
        })
        .catch((error: any) => console.error(error))
    }
  }, [chainId, provider])

  return (
    <TokenSupplyContext.Provider
      value={{
        dpiTotalSupply: dpiTotalSupply,
        mviTotalSupply: mviTotalSupply,
        bedTotalSupply: bedTotalSupply,
        gmiTotalSupply: gmiTotalSupply,
        eth2xfliTotalSupply: eth2xfliTotalSupply,
        eth2xflipTotalSupply: eth2xflipTotalSupply,
        btc2xfliTotalSupply: btc2xfliTotalSupply,
        dataTotalSupply: dataTotalSupply,
        imaticflipTotalSupply: imaticflipTotalSupply,
        matic2xflipTotalSupply: matic2xflipTotalSupply,
        iethflipTotalSupply: iethflipTotalSupply,
      }}
    >
      {children}
    </TokenSupplyContext.Provider>
  )
}

export default TokenSupplyProvider

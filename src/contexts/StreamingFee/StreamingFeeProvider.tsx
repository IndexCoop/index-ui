import React, { useState, useEffect } from 'react'

import { getStreamingFees } from 'utils/setjsApi'
import {
  bedTokenAddress,
  btc2xfliTokenAddress,
  dpiTokenAddress,
  dpiTokenPolygonAddress,
  eth2xfliTokenAddress,
  mviTokenAddress,
  mviTokenPolygonAddress,
} from 'constants/ethContractAddresses'
import { convertToPercentage } from 'utils/ethersBigNumber'
import StreamingFeeContext from './StreamingFeeContext'
import useWallet from 'hooks/useWallet'

const StreamingFeeProvider: React.FC = ({ children }) => {
  const [dpiStreamingFee, setDpiStreamingFee] = useState<string>()
  const [mviStreamingFee, setMviStreamingFee] = useState<string>()
  const [bedStreamingFee, setBedStreamingFee] = useState<string>()
  const [eth2xFliStreamingFee, setEth2xFliStreamingFee] = useState<string>()
  const [btc2xFliStreamingFee, setBtc2xFliStreamingFee] = useState<string>()
  const { ethereum: provider, chainId } = useWallet()

  useEffect(() => {
    if (
      chainId &&
      chainId === 1 &&
      provider &&
      dpiTokenAddress &&
      mviTokenAddress &&
      bedTokenAddress &&
      eth2xfliTokenAddress &&
      btc2xfliTokenAddress
    ) {
      getStreamingFees(
        provider,
        [
          dpiTokenAddress,
          mviTokenAddress,
          bedTokenAddress,
          eth2xfliTokenAddress,
          btc2xfliTokenAddress,
        ],
        chainId
      )
        .then((result) => {
          const [
            dpiResult,
            mviResult,
            bedResult,
            eth2xFliResult,
            btc2xFliResult,
          ] = result
          setDpiStreamingFee(
            convertToPercentage(dpiResult.streamingFeePercentage)
          )
          setMviStreamingFee(
            convertToPercentage(mviResult.streamingFeePercentage)
          )
          setBedStreamingFee(
            convertToPercentage(bedResult.streamingFeePercentage)
          )
          setEth2xFliStreamingFee(
            convertToPercentage(eth2xFliResult.streamingFeePercentage)
          )
          setBtc2xFliStreamingFee(
            convertToPercentage(btc2xFliResult.streamingFeePercentage)
          )
        })
        .catch((error: any) => console.error(error))
    } else if (
      chainId &&
      chainId === 137 &&
      provider &&
      dpiTokenPolygonAddress &&
      mviTokenPolygonAddress
    ) {
      getStreamingFees(
        provider,
        [dpiTokenPolygonAddress, mviTokenPolygonAddress],
        chainId
      )
        .then((result) => {
          const [
            dpiResult,
            mviResult,
            bedResult,
            eth2xFliResult,
            btc2xFliResult,
          ] = result
          setDpiStreamingFee(
            convertToPercentage(dpiResult.streamingFeePercentage)
          )
          setMviStreamingFee(
            convertToPercentage(mviResult.streamingFeePercentage)
          )
          setBedStreamingFee(undefined)
          setEth2xFliStreamingFee(undefined)
          setBtc2xFliStreamingFee(undefined)
        })
        .catch((error: any) => console.error(error))
    }
  }, [chainId, provider])

  return (
    <StreamingFeeContext.Provider
      value={{
        dpiStreamingFee: dpiStreamingFee,
        mviStreamingFee: mviStreamingFee,
        bedStreamingFee: bedStreamingFee,
        eth2xFliStreamingFee: eth2xFliStreamingFee,
        btc2xFliStreamingFee: btc2xFliStreamingFee,
      }}
    >
      {children}
    </StreamingFeeContext.Provider>
  )
}

export default StreamingFeeProvider

import React, { useState, useEffect } from 'react'
import { provider } from 'web3-core'

import { getStreamingFees } from 'utils/setjsApi'
import useWallet from 'hooks/useWallet'
import {
  bedTokenAddress,
  btc2xfliTokenAddress,
  dpiTokenAddress,
  eth2xfliTokenAddress,
  mviTokenAddress,
} from 'constants/ethContractAddresses'
import { convertToPercentage } from 'utils/ethersBigNumber'
import StreamingFeeContext from './StreamingFeeContext'

const StreamingFeeProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: provider } = useWallet()
  const [dpiStreamingFee, setDpiStreamingFee] = useState<string>()
  const [mviStreamingFee, setMviStreamingFee] = useState<string>()
  const [bedStreamingFee, setBedStreamingFee] = useState<string>()
  const [eth2xFliStreamingFee, setEth2xFliStreamingFee] = useState<string>()
  const [btc2xFliStreamingFee, setBtc2xFliStreamingFee] = useState<string>()

  useEffect(() => {
    if (
      ethereum &&
      dpiTokenAddress &&
      mviTokenAddress &&
      bedTokenAddress &&
      eth2xfliTokenAddress &&
      btc2xfliTokenAddress
    ) {
      getStreamingFees(ethereum, [
        dpiTokenAddress,
        mviTokenAddress,
        bedTokenAddress,
        eth2xfliTokenAddress,
        btc2xfliTokenAddress,
      ])
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
    }
  }, [ethereum])

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

import React, { useState, useEffect } from 'react'
import MviIndexComponentsContext from './StreamingFeeContext'
import { getStreamingFees } from "../../utils/setjsApi"
import { provider } from "web3-core"
import useWallet from "../../hooks/useWallet"
import { dpiTokenAddress, mviTokenAddress } from "../../constants/ethContractAddresses"
import { utils } from "ethers"

const StreamingFeeProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: provider } = useWallet()
  const [dpiStreamingFee, setDpiStreamingFee] = useState<string>()
  const [mviStreamingFee, setMviStreamingFee] = useState<string>()


  useEffect(() => {
    if (ethereum && dpiTokenAddress && mviTokenAddress) {
      getStreamingFees(ethereum, [dpiTokenAddress, mviTokenAddress])
        .then(result => {
          console.log(result)
          setDpiStreamingFee(utils.formatUnits(result[0].streamingFeePercentage))
          setDpiStreamingFee(utils.formatUnits(result[1].streamingFeePercentage))
        })
        .catch((error: any) => console.error(error))
    }
  }, [ethereum])

  return (
    <MviIndexComponentsContext.Provider
      value={{
        dpiStreamingFee: dpiStreamingFee,
        mviStreamingFee: mviStreamingFee,
       }}
    >
      {children}
    </MviIndexComponentsContext.Provider>
  )
}

export default StreamingFeeProvider

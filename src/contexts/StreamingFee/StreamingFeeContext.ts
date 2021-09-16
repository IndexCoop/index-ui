import { BigNumber } from "ethers"
import { createContext } from 'react'
import { DefiPulseIndex, MetaverseIndex } from "../../constants/productTokens"

interface StreamingFeeProps {
  dpiStreamingFee?: string;
  mviStreamingFee?: string;
}

const StreamingFee = createContext<StreamingFeeProps>({
  dpiStreamingFee: DefiPulseIndex.fees?.streamingFee,
  mviStreamingFee: MetaverseIndex.fees?.streamingFee,
})

export default StreamingFee

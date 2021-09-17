import { createContext } from 'react'
import { BedIndex, Bitcoin2xFlexibleLeverageIndex, DefiPulseIndex, Ethereum2xFlexibleLeverageIndex, MetaverseIndex } from "../../constants/productTokens"

interface StreamingFeeProps {
  dpiStreamingFee?: string;
  mviStreamingFee?: string;
  bedStreamingFee?: string;
  eth2xFliStreamingFee?: string;
  btc2xFliStreamingFee?: string;
}

const StreamingFee = createContext<StreamingFeeProps>({
  dpiStreamingFee: DefiPulseIndex.fees?.streamingFee,
  mviStreamingFee: MetaverseIndex.fees?.streamingFee,
  bedStreamingFee: BedIndex.fees?.streamingFee,
  eth2xFliStreamingFee: Ethereum2xFlexibleLeverageIndex.fees?.streamingFee,
  btc2xFliStreamingFee: Bitcoin2xFlexibleLeverageIndex.fees?.streamingFee,
})

export default StreamingFee

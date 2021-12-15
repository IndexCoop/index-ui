import { createContext } from 'react'

import {
  BedIndex,
  Bitcoin2xFlexibleLeverageIndex,
  DefiPulseIndex,
  Ethereum2xFlexibleLeverageIndex,
  Ethereum2xFLIP,
  MetaverseIndex,
} from 'constants/productTokens'

interface StreamingFeeProps {
  dpiStreamingFee?: string
  mviStreamingFee?: string
  bedStreamingFee?: string
  eth2xFliStreamingFee?: string
  eth2xFLIPStreamingFee?: string
  btc2xFliStreamingFee?: string
}

const StreamingFee = createContext<StreamingFeeProps>({
  dpiStreamingFee: DefiPulseIndex.fees?.streamingFee,
  mviStreamingFee: MetaverseIndex.fees?.streamingFee,
  bedStreamingFee: BedIndex.fees?.streamingFee,
  eth2xFliStreamingFee: Ethereum2xFlexibleLeverageIndex.fees?.streamingFee,
  eth2xFLIPStreamingFee: Ethereum2xFLIP.fees?.streamingFee,
  btc2xFliStreamingFee: Bitcoin2xFlexibleLeverageIndex.fees?.streamingFee,
})

export default StreamingFee

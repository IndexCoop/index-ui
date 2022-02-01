import { createContext } from 'react'

import {
  BedIndex,
  Bitcoin2xFlexibleLeverageIndex,
  DefiPulseIndex,
  Ethereum2xFlexibleLeverageIndex,
  Ethereum2xFLIP,
  GmiIndex,
  IEthereum2xFLIP,
  MetaverseIndex,
  Matic2xFLI,
  IMatic2xFLI,
} from 'constants/productTokens'

interface StreamingFeeProps {
  dpiStreamingFee?: string
  mviStreamingFee?: string
  bedStreamingFee?: string
  gmiStreamingFee?: string
  eth2xFliStreamingFee?: string
  eth2xFLIPStreamingFee?: string
  btc2xFliStreamingFee?: string
  ieth2xFLIPStreamingFee?: string
  matic2xFLIStreamingFee?: string
  imatic2xFLIStreamingFee?: string
}

const StreamingFee = createContext<StreamingFeeProps>({
  dpiStreamingFee: DefiPulseIndex.fees?.streamingFee,
  mviStreamingFee: MetaverseIndex.fees?.streamingFee,
  bedStreamingFee: BedIndex.fees?.streamingFee,
  gmiStreamingFee: GmiIndex.fees?.streamingFee,
  eth2xFliStreamingFee: Ethereum2xFlexibleLeverageIndex.fees?.streamingFee,
  eth2xFLIPStreamingFee: Ethereum2xFLIP.fees?.streamingFee,
  btc2xFliStreamingFee: Bitcoin2xFlexibleLeverageIndex.fees?.streamingFee,
  ieth2xFLIPStreamingFee: IEthereum2xFLIP.fees?.streamingFee,
  matic2xFLIStreamingFee: Matic2xFLI.fees?.streamingFee,
  imatic2xFLIStreamingFee: IMatic2xFLI.fees?.streamingFee,
})

export default StreamingFee

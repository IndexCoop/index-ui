import { createContext } from 'react'

import {
  BedIndex,
  Bitcoin2xFlexibleLeverageIndex,
  DefiPulseIndex,
  Ethereum2xFlexibleLeverageIndex,
  Ethereum2xFLIP,
  GmiIndex,
  IEthereumFLIP,
  IMaticFLIP,
  Matic2xFLIP,
  MetaverseIndex,
} from 'constants/productTokens'

interface StreamingFeeProps {
  dpiStreamingFee?: string
  mviStreamingFee?: string
  bedStreamingFee?: string
  gmiStreamingFee?: string
  eth2xFliStreamingFee?: string
  eth2xFLIPStreamingFee?: string
  btc2xFliStreamingFee?: string
  iethFLIPStreamingFee?: string
  matic2xFLIPStreamingFee?: string
  imaticFLIPStreamingFee?: string
}

const StreamingFee = createContext<StreamingFeeProps>({
  dpiStreamingFee: DefiPulseIndex.fees?.streamingFee,
  mviStreamingFee: MetaverseIndex.fees?.streamingFee,
  bedStreamingFee: BedIndex.fees?.streamingFee,
  gmiStreamingFee: GmiIndex.fees?.streamingFee,
  eth2xFliStreamingFee: Ethereum2xFlexibleLeverageIndex.fees?.streamingFee,
  eth2xFLIPStreamingFee: Ethereum2xFLIP.fees?.streamingFee,
  btc2xFliStreamingFee: Bitcoin2xFlexibleLeverageIndex.fees?.streamingFee,
  iethFLIPStreamingFee: IEthereumFLIP.fees?.streamingFee,
  matic2xFLIPStreamingFee: Matic2xFLIP.fees?.streamingFee,
  imaticFLIPStreamingFee: IMaticFLIP.fees?.streamingFee,
})

export default StreamingFee

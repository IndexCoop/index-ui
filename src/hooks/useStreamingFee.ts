import { useContext } from 'react'

import { StreamingFeeContext } from 'contexts/StreamingFee'

const useStreamingFee = () => {
  return { ...useContext(StreamingFeeContext) }
}

export default useStreamingFee

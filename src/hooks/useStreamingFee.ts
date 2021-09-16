import { useContext } from 'react'
import { DpiIndexComponentsContext } from 'contexts/DpiIndexComponents'
import { StreamingFeeContext } from "../contexts/StreamingFee"

const useStreamingFee = () => {
  return { ...useContext(StreamingFeeContext) }
}

export default useStreamingFee

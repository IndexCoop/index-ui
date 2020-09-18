import { useContext } from 'react'

import { FarmingContext } from 'contexts/Farming'

const useFarming = () => {
  const {
    isApproved,
    isApproving,
    onApprove
  } = useContext(FarmingContext)
  return {
    isApproved,
    isApproving,
    onApprove,
  }
}

export default useFarming
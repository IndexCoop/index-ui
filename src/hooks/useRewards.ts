import { useContext } from 'react'

import { RewardsContext } from 'contexts/Rewards'

const useRewards = () => {
  return { ...useContext(RewardsContext) }
}

export default useRewards

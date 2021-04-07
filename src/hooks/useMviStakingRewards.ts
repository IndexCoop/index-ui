import { useContext } from 'react'

import { MviStakingRewardsContext } from 'contexts/MviStakingRewards'

const useMviStakingRewards = () => {
  return { ...useContext(MviStakingRewardsContext) }
}

export default useMviStakingRewards

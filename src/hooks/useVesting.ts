import { useContext } from 'react'

import { VestingContext } from 'contexts/Vesting'

const useVesting = () => {
  return { ...useContext(VestingContext) }
}

export default useVesting
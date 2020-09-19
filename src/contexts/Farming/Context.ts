import { createContext } from 'react'

import { ContextValues } from './types'

const Context = createContext<ContextValues>({
  onApprove: () => {},
  onHarvest: () => {},
  onRedeem: () => {},
  onStake: () => {},
  onUnstake: () => {}
})

export default Context
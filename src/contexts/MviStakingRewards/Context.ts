import { createContext } from 'react'

import { ContextValues } from './types'

const Context = createContext<ContextValues>({
  isPoolActive: false,
  onApprove: () => {},
  onUnstakeAndHarvest: () => {},
  onStake: () => {},
  onUnstake: () => {},
  onHarvest: () => {},
})

export default Context

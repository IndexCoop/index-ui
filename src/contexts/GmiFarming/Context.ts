import { createContext } from 'react'

import { ContextValues } from './types'

const Context = createContext<ContextValues>({
  onApprove: () => {},
  onUnstakeAndHarvest: () => {},
  onStake: () => {},
  onUnstake: () => {},
  onHarvest: () => {},
})

export default Context

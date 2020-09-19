import { createContext } from 'react'

import { ContextValues } from './types'

const Context = createContext<ContextValues>({
  onApprove: () => {},
  onStake: () => {},
  onUnstake: () => {}
})

export default Context
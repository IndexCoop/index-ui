import { createContext } from 'react'

import { ContextValues } from './types'

const Context = createContext<ContextValues>({
  onClaimRewards: () => {},
  setMonth: () => {},
})

export default Context

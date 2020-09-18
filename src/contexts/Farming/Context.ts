import { createContext } from 'react'

import { ContextValues } from './types'

const Context = createContext<ContextValues>({
  onApprove: () => {},
})

export default Context
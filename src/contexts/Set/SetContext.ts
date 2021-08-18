import { createContext } from 'react'

import Set from "set.js"

export interface SetContextValues {
  onLogSetFees: () => void,
  // set: Set
}

/**
 * A set of utility functions in order to fetch on-chain data for Index products
 * using the set.js library
 */
const SetContext = createContext<SetContextValues>({
  onLogSetFees: () => {
    return;
  },
  // set: Set,
})

export default SetContext

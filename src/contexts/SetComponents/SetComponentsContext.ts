import { createContext } from 'react'

import { SetComponent } from './SetComponent'

interface SetComponentsProps {
  dpiComponents?: SetComponent[]
  mviComponents?: SetComponent[]
  bedComponents?: SetComponent[]
  gmiComponents?: SetComponent[]
  eth2xfliComponents?: SetComponent[]
  eth2xflipComponents?: SetComponent[]
  btc2xfliComponents?: SetComponent[]
  dataComponents?: SetComponent[]
  iEthFlipComponents?: SetComponent[]
  matic2xFlipComponents?: SetComponent[]
  iMaticFlipComponents?: SetComponent[]
}

const SetComponentsContext = createContext<SetComponentsProps>({})

export default SetComponentsContext

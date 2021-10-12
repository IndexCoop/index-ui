import { createContext } from 'react'
import IndexComponent from 'components/IndexComponent'
import { SetComponent } from "./SetComponent"


interface SetComponentsProps {
  dpiSetComponents?: SetComponent[]
}

const SetComponentsContext = createContext<SetComponentsProps>({})

export default SetComponentsContext

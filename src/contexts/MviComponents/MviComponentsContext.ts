import { createContext } from 'react'
import IndexComponent from 'components/IndexComponent'

interface MviIndexComponentsProps {
  components?: IndexComponent[]
  marketCap?: number
}

const MviIndexComponents = createContext<MviIndexComponentsProps>({})

export default MviIndexComponents

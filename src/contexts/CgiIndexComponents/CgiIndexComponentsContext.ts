import { createContext } from 'react'
import IndexComponent from 'components/IndexComponent'

interface DpiIndexComponentsProps {
  components?: IndexComponent[]
  marketCap?: number
}

const CgiIndexComponents = createContext<DpiIndexComponentsProps>({})

export default CgiIndexComponents

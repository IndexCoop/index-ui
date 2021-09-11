import { createContext } from 'react'
import IndexComponent from 'components/IndexComponent'

interface DataIndexComponentsProps {
  components?: IndexComponent[]
  marketCap?: number
}

const DataIndexComponents = createContext<DataIndexComponentsProps>({})

export default DataIndexComponents

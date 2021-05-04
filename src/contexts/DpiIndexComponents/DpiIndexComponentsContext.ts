import { createContext } from 'react'
import IndexComponent from 'components/IndexComponent'

interface DpiIndexComponentsProps {
  components?: IndexComponent[]
}

const DpiMarketData = createContext<DpiIndexComponentsProps>({})

export default DpiMarketData

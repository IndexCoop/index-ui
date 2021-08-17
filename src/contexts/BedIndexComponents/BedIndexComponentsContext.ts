import { createContext } from 'react'
import IndexComponent from 'components/IndexComponent'

interface BedIndexComponentsProps {
  components?: IndexComponent[]
}

const BedMarketData = createContext<BedIndexComponentsProps>({})

export default BedMarketData

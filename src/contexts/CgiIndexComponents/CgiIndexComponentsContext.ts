import { createContext } from 'react'

interface IndexComponent {
  symbol: string
  id: string
  name: string
  address: string
  quantity: string
  totalPriceUsd: string
  percentOfSet: string
  image: string
  dailyPercentChange: string
}

interface DpiIndexComponentsProps {
  components?: IndexComponent[]
}

const CgiIndexComponents = createContext<DpiIndexComponentsProps>({})

export default CgiIndexComponents

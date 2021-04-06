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

interface MviIndexComponentsProps {
  components?: IndexComponent[]
  marketCap?: number
}

const MviIndexComponents = createContext<MviIndexComponentsProps>({})

export default MviIndexComponents

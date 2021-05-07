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

interface Eth2xFliPortfolioDataProps {
  components?: IndexComponent[]
  symbol?: string
  id?: string
  name?: string
  address?: string
  image?: string
}

const Eth2xFliPortfolioDataContext = createContext<Eth2xFliPortfolioDataProps>(
  {}
)

export default Eth2xFliPortfolioDataContext

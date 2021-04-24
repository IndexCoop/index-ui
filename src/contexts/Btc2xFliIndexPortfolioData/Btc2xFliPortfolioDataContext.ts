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

interface Btc2xFliPortfolioDataProps {
  components?: IndexComponent[]
  symbol?: string
  id?: string
  name?: string
  address?: string
  image?: string
}

const Btc2xFliPortfolioDataContext = createContext<Btc2xFliPortfolioDataProps>(
  {}
)

export default Btc2xFliPortfolioDataContext

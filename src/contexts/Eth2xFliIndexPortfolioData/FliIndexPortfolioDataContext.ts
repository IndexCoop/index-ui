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

interface FliPortfolioDataProps {
  components?: IndexComponent[]
  symbol?: string
  id?: string
  name?: string
  address?: string
  image?: string
}

const FliPortfolioData = createContext<FliPortfolioDataProps>({})

export default FliPortfolioData

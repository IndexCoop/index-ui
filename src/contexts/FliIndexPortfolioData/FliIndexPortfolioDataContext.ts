import { createContext } from 'react'
import IndexComponent from 'components/IndexComponent'

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

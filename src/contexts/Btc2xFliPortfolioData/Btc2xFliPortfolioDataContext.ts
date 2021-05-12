import { createContext } from 'react'
import IndexComponent from 'components/IndexComponent'

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

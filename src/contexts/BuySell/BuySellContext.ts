import { createContext } from 'react'

interface BuySellContextValues {
  onExecuteBuySell: () => void
}

const BuySellContext = createContext<BuySellContextValues>({
  onExecuteBuySell: () => {},
})

export default BuySellContext

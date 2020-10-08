import { createContext } from 'react'

interface WalletContextValues {
  account: string | null | undefined
  ethereum: any
  status: string
  connect: any
  connector: any
  reset: any
}

const WalletContext = createContext<WalletContextValues>({
  account: '',
  ethereum: null,
  status: '',
  connect: () => {},
  connector: () => {},
  reset: () => {},
})

export default WalletContext

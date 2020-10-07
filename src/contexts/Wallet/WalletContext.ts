import { createContext } from 'react'

interface WalletContextValues {
  account: string
  ethereum: any
  status: string
  connect: any
  connector: any
}

const WalletContext = createContext<WalletContextValues>({
  account: '',
  ethereum: null,
  status: '',
  connect: () => {},
  connector: () => {},
})

export default WalletContext
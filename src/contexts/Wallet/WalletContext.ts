import { createContext } from 'react'

interface WalletContextValues {
  account: string | null | undefined
  ethereum: any
  status: string
  isShowingWalletModal: boolean
  isMetamaskConnected: boolean
  connect: any
  connector: any
  reset: any
  onOpenWalletModal: (...args: any[]) => any
  onCloseWalletModal: (...args: any[]) => any
}

const WalletContext = createContext<WalletContextValues>({
  account: '',
  ethereum: null,
  status: '',
  isShowingWalletModal: false,
  isMetamaskConnected: false,
  connect: () => {},
  connector: () => {},
  reset: () => {},
  onOpenWalletModal: () => {},
  onCloseWalletModal: () => {},
})

export default WalletContext

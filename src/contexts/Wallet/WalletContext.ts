import { createContext } from 'react'

type WalletType = 'injected' | 'walletconnect' | 'walletlink' | 'ledgerwallet'

interface WalletContextValues {
  account: string | null | undefined
  ethereum: any
  status: string
  isShowingWalletModal: boolean
  isMetamaskConnected: boolean
  triedEagerConnect: boolean
  connect: (walletType: WalletType) => void
  connector: any
  reset: any
  onOpenWalletModal: (...args: any[]) => any
  onCloseWalletModal: (...args: any[]) => any
  chainId: number | undefined
}

const WalletContext = createContext<WalletContextValues>({
  account: '',
  ethereum: null,
  status: '',
  isShowingWalletModal: false,
  isMetamaskConnected: false,
  triedEagerConnect: false,
  connect: () => {},
  connector: () => {},
  reset: () => {},
  onOpenWalletModal: () => {},
  onCloseWalletModal: () => {},
  chainId: 1,
})

export default WalletContext

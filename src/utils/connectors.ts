import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'

const NETWORK_URL = process.env.REACT_APP_ETHEREUM_RPC_URL

export const NETWORK_CHAIN_ID: number = parseInt(process.env.REACT_APP_ETHEREUM_NETWORK_ID ?? '1')

if (typeof NETWORK_URL === 'undefined') {
  throw new Error(`REACT_APP_ETHEREUM_RPC_URL must be a defined environment variable`)
}

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
})

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: NETWORK_URL },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 15000
})

export const walletlink = new WalletLinkConnector({
  url: NETWORK_URL,
  appName: 'Index',
  appLogoUrl: 'https://index-dao.s3.amazonaws.com/index_owl.png'
})

import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'

import { LedgerConnector } from './ledgerConnector'

const WS_URL = process.env.REACT_APP_ETHEREUM_WS_URL

export type ChainData = {
  name: string
  chainId: number
  rpcUrl: string
  icon: string
  coingeckoId: string
}

export const MAINNET_CHAIN_DATA: ChainData = {
  name: 'Ethereum',
  chainId: 1,
  rpcUrl: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  icon: 'https://raw.githubusercontent.com/sushiswap/icons/master/network/mainnet.jpg',
  coingeckoId: 'ethereum',
}
export const POLYGON_CHAIN_DATA: ChainData = {
  name: 'Polygon',
  chainId: 137,
  rpcUrl: 'https://rpc-mainnet.maticvigil.com/',
  icon: 'https://raw.githubusercontent.com/sushiswap/icons/master/network/polygon.jpg',
  coingeckoId: 'polygon-pos',
}

if (!WS_URL) {
  throw new Error(
    `REACT_APP_ETHEREUM_WS_URL must be a defined environment variable`
  )
}

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 137],
})

export const walletconnect = new WalletConnectConnector({
  rpc: {
    [MAINNET_CHAIN_DATA.chainId]: MAINNET_CHAIN_DATA.rpcUrl,
    [POLYGON_CHAIN_DATA.chainId]: POLYGON_CHAIN_DATA.rpcUrl,
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 15000,
  supportedChainIds: [1, 137],
})

export const walletlink = new WalletLinkConnector({
  url: MAINNET_CHAIN_DATA.rpcUrl,
  appName: 'Index',
  appLogoUrl: 'https://index-dao.s3.amazonaws.com/index_owl.png',
  supportedChainIds: [1, 137],
})

export const ledgerwallet = new LedgerConnector(
  MAINNET_CHAIN_DATA.chainId,
  MAINNET_CHAIN_DATA.rpcUrl,
  WS_URL
)

export const networkConnector = new NetworkConnector({
  urls: { 1: process.env.REACT_APP_ALCHEMY_API || MAINNET_CHAIN_DATA.rpcUrl },
  defaultChainId: 1,
})

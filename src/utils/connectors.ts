import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { LedgerConnector } from './ledgerConnector'

const WS_URL = process.env.REACT_APP_ETHEREUM_WS_URL

export type ChainData = {
  name: string
  chainId: number
  rpcUrl: string
}

export const MAINNET_CHAIN_DATA: ChainData = {
  name: 'Ethereum',
  chainId: 1,
  rpcUrl: 'https://mainnet.eth.aragon.network/',
}
export const POLYGON_CHAIN_DATA: ChainData = {
  name: 'Polygon',
  chainId: 137,
  rpcUrl: 'https://rpc-mainnet.maticvigil.com/',
}

if (!WS_URL) {
  throw new Error(
    `REACT_APP_ETHEREUM_WS_URL must be a defined environment variable`
  )
}

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 137],
})

export const walletconnect = (chainData: ChainData) => {
  console.log('walletConnector', { [chainData.chainId]: chainData.rpcUrl })
  return new WalletConnectConnector({
    rpc: { [chainData.chainId]: chainData.rpcUrl },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
    pollingInterval: 15000,
  })
}

export const walletlink = (chainData: ChainData) => {
  return new WalletLinkConnector({
    url: chainData.rpcUrl,
    appName: 'Index',
    appLogoUrl: 'https://index-dao.s3.amazonaws.com/index_owl.png',
  })
}

export const ledgerwallet = (chainData: ChainData) => {
  return new LedgerConnector(chainData.chainId, chainData.rpcUrl, WS_URL)
}

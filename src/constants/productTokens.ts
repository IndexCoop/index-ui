import * as tokenAddresses from 'constants/ethContractAddresses'

export interface ProductToken {
  name: string
  symbol: string
  address: string
  imageUrl: string
}

export const DefiPulseIndex = {
  name: 'DeFi Pulse Index',
  symbol: 'DPI',
  address: tokenAddresses.dpiTokenAddress,
  image: 'https://index-dao.s3.amazonaws.com/defi_pulse_index_set.svg',
}

export const CoinsharesCryptoGoldIndex = {
  name: 'Coinshares Crypto Gold Index',
  symbol: 'CGI',
  address: tokenAddresses.cgiTokenAddress,
  image: 'https://set-core.s3.amazonaws.com/img/portfolios/coinshares_gold.png',
}

export const IndexToken = {
  name: 'Index Token',
  symbol: 'INDEX',
  address: tokenAddresses.indexTokenAddress,
  image: 'https://index-dao.s3.amazonaws.com/owl.png',
}

export const Ethereum2xFlexibleLeverageIndex = {
  name: 'Ethereum 2x Flexible Leverage Index',
  symbol: 'ETH2x-FLI',
  address: tokenAddresses.fliTokenAddress,
  image: 'https://set-core.s3.amazonaws.com/img/portfolios/eth2x_fli.svg',
}

export const MetaverseIndex = {
  name: 'Metaverse Index',
  symbol: 'MVI',
  address: tokenAddresses.mviTokenAddress,
  image: 'https://set-core.s3.amazonaws.com/img/portfolios/mvi.svg',
}

export const productTokensBySymbol = {
  'DPI': DefiPulseIndex,
  'MVI': MetaverseIndex,
  'CGI': CoinsharesCryptoGoldIndex,
  'ETH2x-FLI': Ethereum2xFlexibleLeverageIndex,
  'INDEX': IndexToken,
}

export default [
  DefiPulseIndex,
  MetaverseIndex,
  CoinsharesCryptoGoldIndex,
  Ethereum2xFlexibleLeverageIndex,
  IndexToken,
]

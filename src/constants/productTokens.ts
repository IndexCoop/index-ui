import bedBorderLogo from 'assets/bed-border.png'
import dataLogo from 'assets/data-logo.png'
import gmiLogo from 'assets/gmilogo.png'
import iethflipLogo from 'assets/iethfliplogo.svg'
import imaticflipLogo from 'assets/imaticflilogo.svg'
import indexLogo from 'assets/index-token.png'
import maticflipLogo from 'assets/maticflilogo.svg'
import * as tokenAddresses from 'constants/ethContractAddresses'

export const dpiTokenImage =
  'https://index-dao.s3.amazonaws.com/defi_pulse_index_set.svg'
export interface ProductToken {
  name: string
  symbol: string
  address: string | undefined
  polygonAddress: string | undefined
  image: string
  coingeckoId: string
  tokensetsId: string
  tokenSelector: string
  fees: { streamingFee: string; mintRedeemFee?: string } | undefined
}

export const DefiPulseIndex: ProductToken = {
  name: 'DeFi Pulse Index',
  symbol: 'DPI',
  address: tokenAddresses.dpiTokenAddress,
  image: dpiTokenImage,
  polygonAddress: tokenAddresses.dpiTokenPolygonAddress,
  coingeckoId: 'defipulse-index',
  tokensetsId: 'dpi',
  tokenSelector: 'dpi',
  fees: {
    streamingFee: '0.95%',
  },
}

export const IndexToken: ProductToken = {
  name: 'Index Token',
  symbol: 'INDEX',
  address: tokenAddresses.indexTokenAddress,
  polygonAddress: tokenAddresses.indexTokenPolygonAddress,
  image: indexLogo,
  coingeckoId: 'index-cooperative',
  tokensetsId: 'index',
  tokenSelector: 'index',
  fees: undefined,
}

export const Ethereum2xFlexibleLeverageIndex: ProductToken = {
  name: 'Ethereum 2x Flexible Leverage Index',
  symbol: 'ETH2x-FLI',
  address: tokenAddresses.eth2xfliTokenAddress,
  polygonAddress: undefined,
  image: 'https://set-core.s3.amazonaws.com/img/portfolios/eth2x_fli.svg',
  coingeckoId: 'eth-2x-flexible-leverage-index',
  tokensetsId: 'ethfli',
  tokenSelector: 'ethfli',
  fees: {
    streamingFee: '1.95%',
  },
}

export const Ethereum2xFLIP: ProductToken = {
  name: 'Ethereum 2x FLI Polygon',
  symbol: 'ETH2X-FLI-P',
  address: undefined,
  polygonAddress: tokenAddresses.eth2xflipTokenAddress,
  image: 'https://set-core.s3.amazonaws.com/img/portfolios/eth2x_fli.svg',
  coingeckoId: 'index-coop-eth-2x-flexible-leverage-index-polygon',
  tokensetsId: 'eth2x-fli-p',
  tokenSelector: 'eth2x-fli-p',
  fees: {
    streamingFee: '1.95%',
    mintRedeemFee: '0.1%',
  },
}

export const MetaverseIndex: ProductToken = {
  name: 'Metaverse Index',
  symbol: 'MVI',
  address: tokenAddresses.mviTokenAddress,
  polygonAddress: tokenAddresses.mviTokenPolygonAddress,
  image: 'https://set-core.s3.amazonaws.com/img/portfolios/mvi.svg',
  coingeckoId: 'metaverse-index',
  tokensetsId: 'mvi',
  tokenSelector: 'mvi',
  fees: {
    streamingFee: '0.95%',
  },
}

export const Bitcoin2xFlexibleLeverageIndex: ProductToken = {
  name: 'Bitcoin 2x Flexible Leverage Index',
  symbol: 'BTC2x-FLI',
  address: tokenAddresses.btc2xfliTokenAddress,
  polygonAddress: undefined,
  image: 'https://set-core.s3.amazonaws.com/img/portfolios/fli_btc.svg',
  coingeckoId: 'btc-2x-flexible-leverage-index',
  tokensetsId: 'btcfli',
  tokenSelector: 'btcfli',
  fees: {
    streamingFee: '1.95%',
  },
}

export const BedIndex: ProductToken = {
  name: 'Bankless BED Index',
  symbol: 'BED',
  address: tokenAddresses.bedTokenAddress,
  polygonAddress: undefined,
  image: bedBorderLogo,
  coingeckoId: 'bankless-bed-index',
  tokensetsId: 'bed',
  tokenSelector: 'bed',
  fees: {
    streamingFee: '0.25%',
  },
}

export const DataIndex: ProductToken = {
  name: 'Data Economy Index',
  symbol: 'DATA',
  address: tokenAddresses.dataTokenAddress,
  polygonAddress: tokenAddresses.dataTokenPolygonAddress,
  image: dataLogo,
  coingeckoId: 'data-economy-index',
  tokensetsId: 'data',
  tokenSelector: 'data',
  fees: {
    streamingFee: '0.95%',
  },
}

export const GmiIndex: ProductToken = {
  name: 'Bankless DeFi Innovation Index',
  symbol: 'GMI',
  address: tokenAddresses.gmiTokenAddress,
  polygonAddress: tokenAddresses.gmiTokenPolygonAddress,
  image: gmiLogo,
  coingeckoId: 'bankless-defi-innovation-index',
  tokensetsId: 'gmi',
  tokenSelector: 'gmi',
  fees: {
    streamingFee: '1.95%',
  },
}

export const Matic2xFLIP: ProductToken = {
  name: 'MATIC 2x Flexible Leverage Index',
  symbol: 'MATIC2x-FLI-P',
  address: undefined,
  polygonAddress: tokenAddresses.matic2xflipTokenAddress,
  image: maticflipLogo,
  coingeckoId: 'index-coop-matic-2x-flexible-leverage-index',
  tokensetsId: 'matic2x-fli-p',
  tokenSelector: 'matic2x-fli-p',
  fees: {
    streamingFee: '1.95%',
    mintRedeemFee: '0.1%',
  },
}

export const IMaticFLIP: ProductToken = {
  name: 'Inverse MATIC Flexible Leverage Index',
  symbol: 'iMATIC-FLI-P',
  address: undefined,
  polygonAddress: tokenAddresses.imaticflipTokenAddress,
  image: imaticflipLogo,
  coingeckoId: 'index-coop-inverse-matic-flexible-leverage-index',
  tokensetsId: 'imatic-fli-p',
  tokenSelector: 'imatic-fli-p',
  fees: {
    streamingFee: '1.95%',
    mintRedeemFee: '0.1%',
  },
}

export const IEthereumFLIP: ProductToken = {
  name: 'Inverse ETH Flexible Leverage Index',
  symbol: 'iETH-FLI-P',
  address: undefined,
  polygonAddress: tokenAddresses.iethflipTokenAddress,
  image: iethflipLogo,
  coingeckoId: 'index-coop-inverse-eth-flexible-leverage-index',
  tokensetsId: 'ieth-fli-p',
  tokenSelector: 'ieth-fli-p',
  fees: {
    streamingFee: '1.95%',
    mintRedeemFee: '0.1%',
  },
}

export const productTokensBySymbol = {
  'DPI': DefiPulseIndex,
  'MVI': MetaverseIndex,
  'ETH2x-FLI': Ethereum2xFlexibleLeverageIndex,
  'ETH2x-FLI-P': Ethereum2xFLIP,
  'INDEX': IndexToken,
  'BTC2x-FLI': Bitcoin2xFlexibleLeverageIndex,
  'BED': BedIndex,
  'DATA': DataIndex,
  'GMI': GmiIndex,
}

const indexNames = [
  DefiPulseIndex,
  MetaverseIndex,
  Ethereum2xFlexibleLeverageIndex,
  Ethereum2xFLIP,
  IndexToken,
  Bitcoin2xFlexibleLeverageIndex,
  BedIndex,
  DataIndex,
  GmiIndex,
]

export default indexNames

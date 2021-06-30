import {
  btc2xfliTokenAddress,
  dpiTokenAddress,
  eth2xfliTokenAddress,
  indexTokenAddress,
  mviTokenAddress,
} from './ethContractAddresses'

export const tokenInfo: any = {
  ethfli: {
    address: eth2xfliTokenAddress,
    decimals: 18,
  },
  btcfli: {
    address: btc2xfliTokenAddress,
    decimals: 18,
  },
  dpi: {
    address: dpiTokenAddress,
    decimals: 18,
  },
  mvi: {
    address: mviTokenAddress,
    decimals: 18,
  },
  index: {
    address: indexTokenAddress,
    decimals: 18,
  },
  ETH: {
    address: 'ETH',
    decimals: 18,
  },
  DAI: {
    address: 'DAI',
    decimals: 18,
  },
  USDC: {
    address: 'USDC',
    decimals: 6,
  },
}

import {
  btc2xfliTokenAddress,
  daiTokenAddress,
  dpiTokenAddress,
  eth2xfliTokenAddress,
  indexTokenAddress,
  mviTokenAddress,
  usdcTokenAddress,
  bedTokenAddress,
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
  bed: {
    address: bedTokenAddress,
    decimals: 18,
  },
  index: {
    address: indexTokenAddress,
    decimals: 18,
  },
  DAI: {
    address: daiTokenAddress,
    decimals: 18,
  },
  USDC: {
    address: usdcTokenAddress,
    decimals: 6,
  },
  ETH: {
    address: 'ETH',
    decimals: 18,
  },
}

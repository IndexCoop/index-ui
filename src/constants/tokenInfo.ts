import {
  bedTokenAddress,
  btc2xfliTokenAddress,
  daiTokenAddress,
  daiTokenPolygonAddress,
  dataTokenAddress,
  dpiTokenAddress,
  dpiTokenPolygonAddress,
  eth2xflipTokenAddress,
  eth2xfliTokenAddress,
  indexTokenAddress,
  mviTokenAddress,
  mviTokenPolygonAddress,
  usdcTokenAddress,
  usdcTokenPolygonAddress,
  wethTokenPolygonAddress,
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
  data: {
    address: dataTokenAddress,
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
export const polygonTokenInfo: any = {
  dpi: {
    address: dpiTokenPolygonAddress,
    decimals: 18,
  },
  mvi: {
    address: mviTokenPolygonAddress,
    decimals: 18,
  },
  DAI: {
    address: daiTokenPolygonAddress,
    decimals: 18,
  },
  USDC: {
    address: usdcTokenPolygonAddress,
    decimals: 6,
  },
  ETH: {
    address: wethTokenPolygonAddress,
    decimals: 18,
  },
  'eth2x-fli-p': {
    address: eth2xflipTokenAddress,
    decimals: 18,
  },
}

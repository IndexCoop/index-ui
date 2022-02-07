import {
  bedTokenAddress,
  btc2xfliTokenAddress,
  daiTokenAddress,
  daiTokenPolygonAddress,
  dataTokenAddress,
  dataTokenPolygonAddress,
  dpiTokenAddress,
  dpiTokenPolygonAddress,
  eth2xflipTokenAddress,
  eth2xfliTokenAddress,
  gmiTokenAddress,
  gmiTokenPolygonAddress,
  iethflipTokenAddress,
  imaticflipTokenAddress,
  indexTokenAddress,
  matic2xflipTokenAddress,
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
  gmi: {
    address: gmiTokenAddress,
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
  'data': {
    address: dataTokenPolygonAddress,
    decimals: 18,
  },
  'dpi': {
    address: dpiTokenPolygonAddress,
    decimals: 18,
  },
  'gmi': {
    address: gmiTokenPolygonAddress,
    decimals: 18,
  },
  'mvi': {
    address: mviTokenPolygonAddress,
    decimals: 18,
  },
  'DAI': {
    address: daiTokenPolygonAddress,
    decimals: 18,
  },
  'USDC': {
    address: usdcTokenPolygonAddress,
    decimals: 6,
  },
  'ETH': {
    address: wethTokenPolygonAddress,
    decimals: 18,
  },
  'eth2x-fli-p': {
    address: eth2xflipTokenAddress,
    decimals: 18,
  },
  'ieth-fli-p': {
    address: iethflipTokenAddress,
    decimals: 18,
  },
  'matic2x-fli-p': {
    address: matic2xflipTokenAddress,
    decimals: 18,
  },
  'imatic-fli-p': {
    address: imaticflipTokenAddress,
    decimals: 18,
  },
}

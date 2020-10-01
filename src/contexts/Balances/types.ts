import BigNumber from 'bignumber.js'

export interface ContextValues {
  yamV2Balance?: BigNumber,
  yamV3Balance?: BigNumber,
  yycrvUniLpBalance?: BigNumber
  indexBalance?: BigNumber,
  dpiBalance?: BigNumber,
  uniswapEthDpiLpBalance?: BigNumber,
}
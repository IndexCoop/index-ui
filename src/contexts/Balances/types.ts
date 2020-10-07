import BigNumber from 'bignumber.js'

export interface ContextValues {
  indexBalance?: BigNumber,
  dpiBalance?: BigNumber,
  uniswapEthDpiLpBalance?: BigNumber,
  stakedUniswapEthDpiLpBalance?: BigNumber,
  unharvestedIndexBalance?: BigNumber
}

import BigNumber from 'utils/bignumber'

export interface ContextValues {
  indexBalance?: BigNumber
  dpiBalance?: BigNumber
  uniswapEthDpiLpBalance?: BigNumber
  stakedUniswapEthDpiLpBalance?: BigNumber
  unharvestedIndexBalance?: BigNumber
}

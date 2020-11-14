import BigNumber from 'utils/bignumber'

export interface ContextValues {
  ethBalance?: BigNumber
  indexBalance?: BigNumber
  dpiBalance?: BigNumber
  daiBalance?: BigNumber
  usdcBalance?: BigNumber
  uniswapEthDpiLpBalance?: BigNumber
  stakedUniswapEthDpiLpBalance?: BigNumber
  unharvestedIndexBalance?: BigNumber
}

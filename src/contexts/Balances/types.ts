import BigNumber from 'utils/bignumber'

export interface ContextValues {
  ethBalance?: BigNumber
  indexBalance?: BigNumber
  dpiBalance?: BigNumber
  cgiBalance?: BigNumber
  daiBalance?: BigNumber
  usdcBalance?: BigNumber
  uniswapEthDpiLpBalance?: BigNumber

  // For Liquidity Mining 1 program
  stakedUniswapEthDpiLpBalance?: BigNumber
  unharvestedIndexBalance?: BigNumber

  // For Liquidity Mining 2 program
  stakedFarmTwoBalance?: BigNumber
  unharvestedFarmTwoBalance?: BigNumber
}

import BigNumber from 'utils/bignumber'

export interface ContextValues {
  ethBalance?: BigNumber
  wethBalancePolygon?: BigNumber
  indexBalance?: BigNumber
  dpiBalance?: BigNumber
  dpiBalancePolygon?: BigNumber
  ethfliBalance?: BigNumber
  btcfliBalance?: BigNumber
  mviBalance?: BigNumber
  mviBalancePolygon?: BigNumber
  daiBalance?: BigNumber
  daiBalancePolygon?: BigNumber
  usdcBalance?: BigNumber
  usdcBalancePolygon?: BigNumber
  bedBalance?: BigNumber
  dataBalance?: BigNumber

  // LP Tokens
  uniswapEthDpiLpBalance?: BigNumber
  uniswapEthMviLpBalance?: BigNumber

  // For Legacy DPI LM Program
  stakedUniswapEthDpiLpBalance?: BigNumber
  unharvestedIndexBalance?: BigNumber

  // For Current DPI LM Program
  stakedFarmTwoBalance?: BigNumber
  unharvestedFarmTwoBalance?: BigNumber

  // For Current MVI LM Program
  stakedUniswapEthMviLpBalance?: BigNumber
  unharvestedMviRewardsBalance?: BigNumber
}

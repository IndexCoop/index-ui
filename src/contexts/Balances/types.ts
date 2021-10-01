import BigNumber from 'utils/bignumber'

export interface ContextValues {
  ethBalance?: BigNumber
  indexBalance?: BigNumber
  dpiBalance?: BigNumber
  ethfliBalance?: BigNumber
  btcfliBalance?: BigNumber
  mviBalance?: BigNumber
  daiBalance?: BigNumber
  usdcBalance?: BigNumber
  bedBalance?: BigNumber

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

  dpiTotalSupply?: BigNumber
  ethfliTotalSupply?: BigNumber
  btcfliTotalSupply?: BigNumber
  mviTotalSupply?: BigNumber
  bedTotalSupply?: BigNumber
}

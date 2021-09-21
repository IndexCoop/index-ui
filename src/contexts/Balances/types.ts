import BigNumber from 'utils/bignumber'

export interface ContextValues {
  ethBalance?: string
  indexBalance?: string
  dpiBalance?: string
  ethfliBalance?: string
  btcfliBalance?: string
  mviBalance?: string
  daiBalance?: string
  usdcBalance?: string
  bedBalance?: string

  // LP Tokens
  uniswapEthDpiLpBalance?: string
  uniswapEthMviLpBalance?: string

  // For Legacy DPI LM Program
  stakedUniswapEthDpiLpBalance?: string
  unharvestedIndexBalance?: string

  // For Current DPI LM Program
  stakedFarmTwoBalance?: string
  unharvestedFarmTwoBalance?: string

  // For Current MVI LM Program
  stakedUniswapEthMviLpBalance?: string
  unharvestedMviRewardsBalance?: string

  dpiTotalSupply?: BigNumber
  ethfliTotalSupply?: BigNumber
  btcfliTotalSupply?: BigNumber
  mviTotalSupply?: BigNumber
  bedTotalSupply?: BigNumber
}

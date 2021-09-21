import BigNumber from 'utils/bignumber'

export interface ContextValues {
<<<<<<< HEAD
  ethBalance?: BigNumber
  indexBalance?: BigNumber
  dpiBalance?: BigNumber
  ethfliBalance?: BigNumber
  btcfliBalance?: BigNumber
  mviBalance?: BigNumber
  daiBalance?: BigNumber
  usdcBalance?: BigNumber
  bedBalance?: BigNumber
  dataBalance?: BigNumber
=======
  ethBalance?: string
  indexBalance?: string
  dpiBalance?: string
  ethfliBalance?: string
  btcfliBalance?: string
  mviBalance?: string
  daiBalance?: string
  usdcBalance?: string
  bedBalance?: string
>>>>>>> 45d3343... updating balances context/provider

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
  dataTotalSupply?: BigNumber
}

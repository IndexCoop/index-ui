import { createContext } from 'react'

import BigNumber from 'bignumber.js'

interface TokenSupplyProps {
  dpiTotalSupply?: BigNumber
  mviTotalSupply?: BigNumber
  bedTotalSupply?: BigNumber
  gmiTotalSupply?: BigNumber
  eth2xfliTotalSupply?: BigNumber
  eth2xflipTotalSupply?: BigNumber
  btc2xfliTotalSupply?: BigNumber
  dataTotalSupply?: BigNumber
  iethflipTotalSupply?: BigNumber
  matic2xfliTotalSupply?: BigNumber
  imatic2xfliTotalSupply?: BigNumber
}

const TokenSupply = createContext<TokenSupplyProps>({
  dpiTotalSupply: undefined,
  mviTotalSupply: undefined,
  bedTotalSupply: undefined,
  gmiTotalSupply: undefined,
  eth2xfliTotalSupply: undefined,
  eth2xflipTotalSupply: undefined,
  btc2xfliTotalSupply: undefined,
  dataTotalSupply: undefined,
  iethflipTotalSupply: undefined,
  matic2xfliTotalSupply: undefined,
  imatic2xfliTotalSupply: undefined,
})

export default TokenSupply

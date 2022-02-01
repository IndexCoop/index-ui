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
  ieth2xflipTotalSupply?: BigNumber
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
  ieth2xflipTotalSupply: undefined,
  matic2xfliTotalSupply: undefined,
  imatic2xfliTotalSupply: undefined,
})

export default TokenSupply

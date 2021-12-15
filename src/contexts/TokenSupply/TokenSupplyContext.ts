import { createContext } from 'react'

import BigNumber from 'bignumber.js'

interface TokenSupplyProps {
  dpiTotalSupply?: BigNumber
  mviTotalSupply?: BigNumber
  bedTotalSupply?: BigNumber
  eth2xfliTotalSupply?: BigNumber
  eth2xflipTotalSupply?: BigNumber
  btc2xfliTotalSupply?: BigNumber
  dataTotalSupply?: BigNumber
}

const TokenSupply = createContext<TokenSupplyProps>({
  dpiTotalSupply: undefined,
  mviTotalSupply: undefined,
  bedTotalSupply: undefined,
  eth2xfliTotalSupply: undefined,
  eth2xflipTotalSupply: undefined,
  btc2xfliTotalSupply: undefined,
  dataTotalSupply: undefined,
})

export default TokenSupply

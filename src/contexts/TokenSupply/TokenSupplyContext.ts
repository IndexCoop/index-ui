import BigNumber from "bignumber.js"
import { createContext } from 'react'

interface TokenSupplyProps {
  dpiTotalSupply?: BigNumber;
  mviTotalSupply?: BigNumber;
  bedTotalSupply?: BigNumber;
  eth2xfliTotalSupply?: BigNumber;
  btc2xfliTotalSupply?: BigNumber;
  dataTotalSupply?: BigNumber;
}

const TokenSupply = createContext<TokenSupplyProps>({
  dpiTotalSupply: undefined,
  mviTotalSupply: undefined,
  bedTotalSupply: undefined,
  eth2xfliTotalSupply: undefined,
  btc2xfliTotalSupply: undefined,
  dataTotalSupply: undefined,
})

export default TokenSupply

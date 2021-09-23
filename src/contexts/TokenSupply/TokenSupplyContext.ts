import BigNumber from "bignumber.js"
import { createContext } from 'react'

interface StreamingFeeProps {
  dpiTotalSupply?: BigNumber;
  mviTotalSupply?: BigNumber;
  bedTotalSupply?: BigNumber;
  eth2xfliTotalSupply?: BigNumber;
  btc2xfliTotalSupply?: BigNumber;
}

const StreamingFee = createContext<StreamingFeeProps>({
  dpiTotalSupply: undefined,
  mviTotalSupply: undefined,
  bedTotalSupply: undefined,
  eth2xfliTotalSupply: undefined,
  btc2xfliTotalSupply: undefined,
})

export default StreamingFee

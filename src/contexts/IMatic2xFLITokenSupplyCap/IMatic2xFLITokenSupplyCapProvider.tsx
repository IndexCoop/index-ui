import React, { useEffect, useState } from 'react'

import { eth2xFLIPSuppyCapAddress } from 'constants/ethContractAddresses'
import { getSupplyCap } from 'utils'
import BigNumber from 'utils/bignumber'

import TotalSupplyContext from './IMatic2xFLITokenSupplyCapContext'

const IMatic2xFLITokenSupplyCapProvider: React.FC = ({ children }) => {
  const [ethFLIPSupplyCap, setEthFLIPSupplyCap] = useState<BigNumber>(
    new BigNumber(250000)
  )

  // TODO: fix supply cap fetching implementation
  // useEffect(() => {
  //   getSupplyCap(eth2xFLIPSuppyCapAddress as string).then((val) => {
  //     console.log(
  //       'val is',
  //       new BigNumber(val).dividedBy(new BigNumber(10).pow(18))
  //     )
  //     setEthFLIPSupplyCap(
  //       new BigNumber(val).dividedBy(new BigNumber(10).pow(18))
  //     )
  //   })
  // }, [])

  return (
    <TotalSupplyContext.Provider
      value={{
        imaticfliSupplyCap: ethFLIPSupplyCap,
      }}
    >
      {children}
    </TotalSupplyContext.Provider>
  )
}
export default IMatic2xFLITokenSupplyCapProvider

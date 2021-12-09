import React, { useState, useEffect } from 'react'
import BigNumber from 'utils/bignumber'

import TotalSupplyContext from './Eth2xFLIPTokenSupplyCapContext'
import { getSupplyCap } from 'utils'
import { eth2xFLIPSuppyCapAddress } from 'constants/ethContractAddresses'

const Eth2xFliTokenSupplyCapProvider: React.FC = ({ children }) => {
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
        ethflipSupplyCap: ethFLIPSupplyCap,
      }}
    >
      {children}
    </TotalSupplyContext.Provider>
  )
}
export default Eth2xFliTokenSupplyCapProvider

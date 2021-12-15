import React, { useEffect,useState } from 'react'

import { eth2xfliSuppyCapAddress } from 'constants/ethContractAddresses'
import { getSupplyCap } from 'utils'
import BigNumber from 'utils/bignumber'

import TotalSupplyContext from './Eth2xFliTokenSupplyCapContext'

const Eth2xFliTokenSupplyCapProvider: React.FC = ({ children }) => {
  const [ethFliSupplyCap, setEthFliSupplyCap] = useState<BigNumber>()

  useEffect(() => {
    getSupplyCap(eth2xfliSuppyCapAddress as string).then((val) => {
      setEthFliSupplyCap(
        new BigNumber(val).dividedBy(new BigNumber(10).pow(18))
      )
    })
  }, [])

  return (
    <TotalSupplyContext.Provider
      value={{
        ethfliSupplyCap: ethFliSupplyCap,
      }}
    >
      {children}
    </TotalSupplyContext.Provider>
  )
}
export default Eth2xFliTokenSupplyCapProvider

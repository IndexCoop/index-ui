import React, { useState, useEffect } from 'react'
import BigNumber from 'utils/bignumber'

import TotalSupplyContext from './Btc2xFliTokenSupplyCapContext'
import { getSupplyCap } from 'utils'
import { btc2xfliSuppyCapAddress } from 'constants/ethContractAddresses'

const Btc2xFliTokenSupplyCapProvider: React.FC = ({ children }) => {
  const [btcFliSupplyCap, setBtcFliSupplyCap] = useState<BigNumber>()

  useEffect(() => {
    getSupplyCap(btc2xfliSuppyCapAddress as string).then((val) => {
      setBtcFliSupplyCap(
        new BigNumber(val).dividedBy(new BigNumber(10).pow(18))
      )
    })
  }, [])

  return (
    <TotalSupplyContext.Provider
      value={{
        btcfliSupplyCap: btcFliSupplyCap,
      }}
    >
      {children}
    </TotalSupplyContext.Provider>
  )
}
export default Btc2xFliTokenSupplyCapProvider

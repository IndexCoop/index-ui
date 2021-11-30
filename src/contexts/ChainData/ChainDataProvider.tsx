import React, { useCallback, useState } from 'react'
import {
  ChainData,
  MAINNET_CHAIN_DATA,
  POLYGON_CHAIN_DATA,
} from 'utils/connectors'

import { ChainDataContext } from '.'

const ChainIdProvider: React.FC = ({ children }) => {
  const [chain, setChain] = useState<ChainData>(MAINNET_CHAIN_DATA)

  const setMainnet = useCallback(() => {
    setChain(MAINNET_CHAIN_DATA)
  }, [])

  const setPolygon = useCallback(() => {
    setChain(POLYGON_CHAIN_DATA)
  }, [])

  return (
    <ChainDataContext.Provider
      value={{
        chain,
        setMainnet,
        setPolygon,
      }}
    >
      {children}
    </ChainDataContext.Provider>
  )
}

export default ChainIdProvider

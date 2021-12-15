import { createContext } from 'react'

import { ChainData, MAINNET_CHAIN_DATA } from 'utils/connectors'

interface ChainIdContextValues {
  chain: ChainData
  setMainnet: () => void
  setPolygon: () => void
}

const ChainIdContext = createContext<ChainIdContextValues>({
  chain: MAINNET_CHAIN_DATA,
  setMainnet: () => {},
  setPolygon: () => {},
})

export default ChainIdContext

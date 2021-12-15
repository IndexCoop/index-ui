import React, { useState } from 'react'

import useWallet from 'hooks/useWallet'
import {
  ChainData,
  MAINNET_CHAIN_DATA,
  POLYGON_CHAIN_DATA,
} from 'utils/connectors'

import { ChainDataContext } from '.'

const ChainIdProvider: React.FC = ({ children }) => {
  const [chain, setChain] = useState<ChainData>(MAINNET_CHAIN_DATA)
  const { account, ethereum, isMetamaskConnected } = useWallet()

  const setMainnet = () => {
    setChain(MAINNET_CHAIN_DATA)
    if (isMetamaskConnected)
      ethereum?.send('wallet_switchEthereumChain', [
        { chainId: '0x1' },
        account,
      ])
  }

  const setPolygon = () => {
    setChain(POLYGON_CHAIN_DATA)
    if (isMetamaskConnected)
      ethereum?.send('wallet_addEthereumChain', [
        {
          chainId: '0x89',
          chainName: 'Polygon',
          nativeCurrency: {
            name: 'Matic',
            symbol: 'MATIC',
            decimals: 18,
          },
          rpcUrls: ['https://rpc-mainnet.maticvigil.com'],
          blockExplorerUrls: ['https://polygonscan.com/'],
        },
        account,
      ])
  }

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

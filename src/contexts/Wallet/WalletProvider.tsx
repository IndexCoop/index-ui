import React, { useCallback, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import {
  activateInjected,
  activateWalletConnect,
  activateWalletLink,
} from 'utils/connectors'

import WalletContext from './WalletContext'

const WalletProvider: React.FC = ({ children }) => {
  const [account, setAccount] = useState<string>('')
  const [connector, setConnector] = useState<any>()

  const connect = useCallback((walletType: string) => {
    setAccount('');
    setConnector(undefined);

    if (walletType === 'Metamask') {
      activateInjected();
    } else if (walletType === 'WalletConnect') {
      activateWalletConnect();
    } else if (walletType === 'WalletLink') {
      activateWalletLink();
    }
  }, [account, connector]);

  const { library: ethereum } = useWeb3React();

  return (
    <WalletContext.Provider value={{
      account,
      connector,
      ethereum,
      status,
      connect,
    }}>
      {children}
    </WalletContext.Provider>
  )
}

export default WalletProvider
import React, { useCallback, useState } from 'react'
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import {
  injected,
  walletconnect,
  walletlink,
} from 'utils/connectors'

import WalletContext from './WalletContext'

const WalletProvider: React.FC = ({ children}) => {
  const [connector, setConnector] = useState<string>('')
  const [status, setStatus] = useState('disconnected')
  const { account, activate, active, deactivate } = useWeb3React()

  const reset = useCallback(() => {
    if (active) deactivate()

    setConnector('');
    setStatus('disconnected');
    localStorage.removeItem('walletconnect');
  }, [account, active, connector, status]);

  const connect = useCallback(async (walletType: string) => {
    try {
      reset()
      setConnector(walletType);
      setStatus('connecting')

      if (walletType === 'injected') {
        await activate(injected, undefined, true)
        setStatus('connected')
      } else if (walletType === 'walletconnect') {
        await activate(walletconnect, undefined, true)
        setStatus('connected')
      } else if (walletType === 'walletlink') {
        await activate(walletlink, undefined, true)
        setStatus('connected')
      }

    } catch (err) {
      console.log(err);
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
        reset,
      }}>
        {children}
      </WalletContext.Provider>
  )
}

interface UseWalletProviderWrapperPropTypes {
  children: any;
}

function UseWalletProviderWrapper(props: UseWalletProviderWrapperPropTypes) {
  return (
    <Web3ReactProvider getLibrary={ethereum => ethereum}>
      <WalletProvider {...props} />
    </Web3ReactProvider>
  );
}

export default UseWalletProviderWrapper;

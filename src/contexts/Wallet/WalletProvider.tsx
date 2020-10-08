import React, { useCallback, useContext, useMemo, useState } from 'react'
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import {
  injected,
  walletconnect,
  walletlink,
} from 'utils/connectors'

import WalletContext from './WalletContext'

const UseWalletContext = React.createContext(null)

export function useWallet() {
  const walletContext = useContext(UseWalletContext)

  if (walletContext === null) {
    throw new Error(
      'useWallet() can only be used inside of <UseWalletProvider />, ' +
        'please declare it at a higher level.'
    )
  }

  const { wallet } = walletContext

  return useMemo(() => wallet, [wallet])
}

const WalletProvider: React.FC = ({ children}) => {
  const [account, setAccount] = useState<string>('')
  const [connector, setConnector] = useState<any>()
  const [status, setStatus] = useState('disconnected')
  const { activate } = useWeb3React()

  const connect = useCallback((walletType: string) => {
    setAccount('');
    setConnector(undefined);

    if (walletType === 'injected') {
      activate(injected)
      setStatus('connected')
    } else if (walletType === 'walletconnect') {
      activate(walletconnect)
      setStatus('connected')
    } else if (walletType === 'walletlink') {
      activate(walletlink)
      setStatus('connected')
    }
  }, [account, connector]);

  const reset = useCallback(() => {
    setAccount('');
    setConnector(undefined);
    setStatus('disconnected');
  }, [account, connector, status]);

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

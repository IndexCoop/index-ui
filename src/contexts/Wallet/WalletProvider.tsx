import React, { useCallback, useContext, useMemo, useRef, useState } from 'react'
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
  const [connector, setConnector] = useState<string>()
  const [status, setStatus] = useState('disconnected')
  const { account, activate, active, deactivate } = useWeb3React()
  const activationId = useRef(0)

  // Resets the user's web3 session
  const reset = useCallback(() => {
    if (active) {
      deactivate()
    }
    setConnector('');
    localStorage.removeItem('walletconnect');
    setStatus('disconnected');
  }, [account, connector, status]);

  // Connects user to Web3
  const connect = useCallback(async (walletType: string) => {
    // Prevent race conditions between connections by using an external ID.
    const id = ++activationId.current
    reset()
    // Check if another connection has happened right after deactivate().
    if (id !== activationId.current) {
      return
    }

    try {
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
      // Don’t throw if another connection has happened in the meantime.
      if (id !== activationId.current) {
        return
      }
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

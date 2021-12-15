import React, { useCallback, useEffect,useState } from 'react'

import { useWeb3React, Web3ReactProvider } from '@web3-react/core'

import useChainData from 'hooks/useChainData'
import useEagerConnect from 'hooks/useEagerConnect'
import {
  injected,
  ledgerwallet,
  walletconnect,
  walletlink,
} from 'utils/connectors'

import WalletContext from './WalletContext'

const WalletProvider: React.FC = ({ children }) => {
  const [connector, setConnector] = useState<string>('')
  const [status, setStatus] = useState('disconnected')
  const [isShowingWalletModal, setIsShowingWalletModal] =
    useState<boolean>(false)
  const [isMetamaskConnected, setIsMetamaskConnected] = useState<boolean>(false)
  const {
    account,
    activate,
    active,
    deactivate,
    library: ethereum,
    chainId,
  } = useWeb3React()

  const reset = useCallback(() => {
    if (active) deactivate()

    setConnector('')
    setStatus('disconnected')
    localStorage.removeItem('walletconnect')
  }, [active, deactivate])

  const connect = useCallback(
    async (walletType: string) => {
      try {
        reset()
        setConnector(walletType)
        setStatus('connecting')
        switch (walletType) {
          case 'injected':
            activate(injected, undefined, true)
            setStatus('connected')
            setIsMetamaskConnected(true)
            break
          case 'walletconnect':
            await activate(walletconnect, undefined, true)
            setStatus('connected')
            break
          case 'walletlink':
            await activate(walletlink, undefined, true)
            setStatus('connected')
            break
          case 'ledgerwallet':
            await activate(ledgerwallet, undefined, true)
            setStatus('connected')
            break
          default:
            throw new Error('unknown wallet type: ' + walletType)
        }
      } catch (err) {
        console.log(err)
      }
    },
    [activate, reset]
  )

  const triedEagerConnect = useEagerConnect(connect)

  const onOpenWalletModal = useCallback(() => {
    setIsShowingWalletModal(true)
  }, [setIsShowingWalletModal])

  const onCloseWalletModal = useCallback(() => {
    setIsShowingWalletModal(false)
  }, [setIsShowingWalletModal])

  return (
    <WalletContext.Provider
      value={{
        account,
        connector,
        ethereum,
        status,
        isShowingWalletModal,
        isMetamaskConnected,
        triedEagerConnect,
        connect,
        reset,
        onOpenWalletModal,
        onCloseWalletModal,
        chainId,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

interface UseWalletProviderWrapperPropTypes {
  children: any
}

function UseWalletProviderWrapper(props: UseWalletProviderWrapperPropTypes) {
  return (
    <Web3ReactProvider getLibrary={(ethereum) => ethereum}>
      <WalletProvider {...props} />
    </Web3ReactProvider>
  )
}

export default UseWalletProviderWrapper

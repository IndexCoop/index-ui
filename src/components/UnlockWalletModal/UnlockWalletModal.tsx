import React, { useCallback, useEffect } from 'react'
import {
  Box,
  Button,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
  Spacer,
} from 'react-neu'
import styled from 'styled-components'
import useWallet from 'hooks/useWallet'
import { toast } from 'react-toastify'

import metamaskLogo from 'assets/metamask-fox.svg'
import walletConnectLogo from 'assets/wallet-connect.svg'
import coinbaseWalletLogo from 'assets/coinbase-wallet.svg'

import Modal from 'components/CustomModal'
import WalletProviderCard from './components/WalletProviderCard'

const UnlockWalletModal: React.FC<ModalProps> = ({ isOpen, onDismiss }) => {
  const { account, connect } = useWallet()

  const handleConnectMetamask = useCallback(() => {
    connect('injected')
  }, [connect])

  const handleConnectWalletConnect = useCallback(() => {
    connect('walletconnect')
  }, [connect])

  const handleConnectWalletLink = useCallback(() => {
    connect('walletlink')
  }, [connect])

  useEffect(() => {
    if (account) {
      onDismiss && onDismiss()
      toast.success("Welcome! You've logged in.")
    }
  }, [account, onDismiss])

  return (
    <Modal isOpen={isOpen}>
      <StyledModalBody>
        <ModalTitle text='Select a wallet provider.' />
        <ModalContent>
          <StyledWalletsWrapper>
            <Box flex={1}>
              <WalletProviderCard
                icon={<img src={metamaskLogo} style={{ height: 32 }} />}
                name='Metamask'
                onSelect={handleConnectMetamask}
              />
            </Box>
            <Spacer />
            <Box flex={1}>
              <WalletProviderCard
                icon={
                  <img
                    src={walletConnectLogo}
                    style={{ height: 24, marginTop: '8px' }}
                  />
                }
                name='WalletConnect'
                onSelect={handleConnectWalletConnect}
              />
            </Box>
          </StyledWalletsWrapper>
          <Spacer />
          <StyledWalletsWrapper>
            <Box flex={1}>
              <WalletProviderCard
                icon={<img src={coinbaseWalletLogo} style={{ height: 32 }} />}
                name='Coinbase Wallet'
                onSelect={handleConnectWalletLink}
              />
            </Box>
            <Spacer />
            <Box flex={1}></Box>
          </StyledWalletsWrapper>
        </ModalContent>
        <ModalActions>
          <Box flex={1} row justifyContent='center'>
            <Button onClick={onDismiss} text='Cancel' variant='secondary' />
          </Box>
        </ModalActions>
      </StyledModalBody>
    </Modal>
  )
}
const StyledModalBody = styled.div`
  @media (max-width: 600px) {
    height: 100vh;
    overflow-y: scroll;
  }
`

const StyledWalletsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    flex-direction: column;
    flex-wrap: none;
  }
`

export default UnlockWalletModal

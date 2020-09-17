import React, { useCallback, useEffect } from 'react'
import {
  Box,
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
  Spacer,
} from 'react-neu'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'

import metamaskLogo from 'assets/metamask-fox.svg'
import walletConnectLogo from 'assets/wallet-connect.svg'

import WalletProviderCard from './components/WalletProviderCard'

const UnlockWalletModal: React.FC<ModalProps> = ({
  isOpen,
  onDismiss,
}) => {
  const { account, connect } = useWallet()

  const handleConnectMetamask = useCallback(() => {
    connect('injected')
  }, [connect])

  const handleConnectWalletConnect = useCallback(() => {
    connect('walletconnect')
  }, [connect])

  useEffect(() => {
    if (account) {
      onDismiss && onDismiss()
    }
  }, [account, onDismiss])

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text="Select a wallet provider." />
      <ModalContent>
        <StyledWalletsWrapper>
          <Box flex={1}>
            <WalletProviderCard
              icon={<img src={metamaskLogo} style={{ height: 32 }} />}
              name="Metamask"
              onSelect={handleConnectMetamask}
            />
          </Box>
          <Spacer />
          <Box flex={1}>
            <WalletProviderCard
              icon={<img src={walletConnectLogo} style={{ height: 24 }} />}
              name="WalletConnect"
              onSelect={handleConnectWalletConnect}
            />
          </Box>
        </StyledWalletsWrapper>
      </ModalContent>
      <ModalActions>
        <Box flex={1} row justifyContent="center">
          <Button onClick={onDismiss} text="Cancel" variant="secondary" />
        </Box>
      </ModalActions>
    </Modal>
  )
}

const StyledWalletsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    flex-direction: column;
    flex-wrap: none;
  }
`

export default UnlockWalletModal
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
import { toast } from 'react-toastify'

import styled from 'styled-components'

import argentLogo from 'assets/argent-wallet.svg'
import coinbaseWalletLogo from 'assets/coinbase-wallet.svg'
import ledgerWalletLogo from 'assets/ledger-wallet.png'
import metamaskLogo from 'assets/metamask-fox.svg'
import ontoLogo from 'assets/onto-wallet.png'
import rainbowWalletLogo from 'assets/rainbow-logo.png'
import trustWalletLogo from 'assets/trust-wallet.svg'
import walletConnectLogo from 'assets/wallet-connect.svg'
import Modal from 'components/CustomModal'
import useWallet from 'hooks/useWallet'

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

  const handleConnectLedgerWallet = useCallback(() => {
    connect('ledgerwallet')
  }, [connect])

  useEffect(() => {
    if (account) {
      onDismiss && onDismiss()
      toast.success("Welcome! You've logged in.")
    }
  }, [account, onDismiss])

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss}>
      <StyledModalBody>
        <ModalTitle text='Select a wallet provider.' />
        <ModalContent>
          <ScrollableContent>
            <StyledWalletsWrapper>
              <Box flex={1}>
                <WalletProviderCard
                  icon={
                    <img
                      alt='metamaskLogo'
                      src={metamaskLogo}
                      style={{ height: 32 }}
                    />
                  }
                  name='Metamask'
                  onSelect={handleConnectMetamask}
                />
              </Box>
              <Spacer />
              <Box flex={1}>
                <WalletProviderCard
                  icon={
                    <img
                      alt='walletConnectLogo'
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
                  icon={
                    <img
                      alt='coinbaseWalletLogo'
                      src={coinbaseWalletLogo}
                      style={{ height: 32 }}
                    />
                  }
                  name='Coinbase Wallet'
                  onSelect={handleConnectWalletLink}
                />
              </Box>
              <Spacer />
              <Box flex={1}>
                <WalletProviderCard
                  icon={
                    <img
                      alt='rainbowWalletLogo'
                      src={rainbowWalletLogo}
                      style={{ borderRadius: 11, height: 32 }}
                    />
                  }
                  name='Rainbow'
                  onSelect={handleConnectWalletConnect}
                />
              </Box>
            </StyledWalletsWrapper>
            <Spacer />
            <StyledWalletsWrapper>
              <Box flex={1}>
                <WalletProviderCard
                  icon={
                    <img
                      alt='argentLogo'
                      src={argentLogo}
                      style={{ height: 32 }}
                    />
                  }
                  name='Argent'
                  onSelect={handleConnectWalletConnect}
                />
              </Box>
              <Spacer />
              <Box flex={1}>
                <WalletProviderCard
                  icon={
                    <img
                      alt='ontoLogo'
                      src={ontoLogo}
                      style={{ borderRadius: 11, height: 32 }}
                    />
                  }
                  name='ONTO Wallet'
                  onSelect={handleConnectWalletConnect}
                />
              </Box>
            </StyledWalletsWrapper>
            <Spacer />
            <StyledWalletsWrapper>
              <Box flex={1}>
                <WalletProviderCard
                  icon={
                    <img
                      alt='trustWalletLogo'
                      src={trustWalletLogo}
                      style={{ height: 32 }}
                    />
                  }
                  name='Trust Wallet'
                  onSelect={handleConnectWalletConnect}
                />
              </Box>
              <Box flex={1}>
                <WalletProviderCard
                  icon={
                    <img
                      alt='ledgerWalletLogo'
                      src={ledgerWalletLogo}
                      style={{ height: 32 }}
                    />
                  }
                  name='Ledger'
                  onSelect={handleConnectLedgerWallet}
                ></WalletProviderCard>
              </Box>
            </StyledWalletsWrapper>
          </ScrollableContent>
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

const ScrollableContent = styled.div`
  @media (min-width: 600px) {
    max-height: 50vh;
    overflow-y: scroll;
  }
`

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

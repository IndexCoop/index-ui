import React from 'react'
import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
  Spacer,
} from 'react-neu'

import WalletProviderCard from './components/WalletProviderCard'

const UnlockWalletModal: React.FC<ModalProps> = ({
  isOpen,
  onDismiss,
}) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text="Select a wallet provider." />
      <ModalContent>
        <WalletProviderCard
          icon="."
          name="Metamask"
          onSelect={() => {}}
        />
        <Spacer />
        <WalletProviderCard
          icon="."
          name="WalletConnect"
          onSelect={() => {}}
        />
      </ModalContent>
      <ModalActions>
        <Button onClick={onDismiss} text="Cancel" variant="secondary" />
      </ModalActions>
    </Modal>
  )
}

export default UnlockWalletModal
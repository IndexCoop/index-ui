import React from 'react'

import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
} from 'react-neu'

const UnstakeModal: React.FC<ModalProps> = ({ isOpen, onDismiss }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text="Unstake" />
      <ModalContent>

      </ModalContent>
      <ModalActions>
        <Button
          onClick={onDismiss}
          text="Cancel"
          variant="secondary"
        />
        <Button text="Unstake" />
      </ModalActions>
    </Modal>
  )
}

export default UnstakeModal
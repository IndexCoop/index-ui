import React from 'react'

import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
} from 'react-neu'

const VestingModal: React.FC<ModalProps> = ({ isOpen, onDismiss }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text="Vesting" />
      <ModalContent>
      </ModalContent>
      <ModalActions>
        <Button
          onClick={onDismiss}
          text="Cancel"
          variant="secondary"
        />
      </ModalActions>
    </Modal>
  )
}

export default VestingModal
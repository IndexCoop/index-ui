import React from 'react'

import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
} from 'react-neu'

const StakeModal: React.FC<ModalProps> = ({ isOpen, onDismiss }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text="Stake" />
      <ModalContent>

      </ModalContent>
      <ModalActions>
        <Button
          onClick={onDismiss}
          text="Cancel"
          variant="secondary"
        />
        <Button text="Stake" />
      </ModalActions>
    </Modal>
  )
}

export default StakeModal
import React from 'react'

import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
} from 'react-neu'

const HarvestModal: React.FC<ModalProps> = ({ isOpen, onDismiss }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text="Harvest" />
      <ModalContent>

      </ModalContent>
      <ModalActions>
        <Button
          onClick={onDismiss}
          text="Cancel"
          variant="secondary"
        />
        <Button text="Harvest" />
      </ModalActions>
    </Modal>
  )
}

export default HarvestModal
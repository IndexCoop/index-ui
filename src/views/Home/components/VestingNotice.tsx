import React, { useCallback, useState } from 'react'
import {
  Box,
  Button,
  Notice,
} from 'react-neu'

import VestingModal from 'components/VestingModal'

const VestingNotice: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleClaimClick = useCallback(() => {
    setModalIsOpen(true)
  }, [setModalIsOpen])

  const handleDismissModal = useCallback(() => {
    setModalIsOpen(false)
  }, [setModalIsOpen])

  return (
    <>
      <Notice>
        <Box flex={1} />
        <Button onClick={handleClaimClick} text="Claim" />
      </Notice>
      <VestingModal
        isOpen={modalIsOpen}
        onDismiss={handleDismissModal}
      />
    </>
  )
}

export default VestingNotice
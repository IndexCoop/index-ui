import React, { useCallback, useState } from 'react'
import {
  Box,
  Button,
  Notice,
  NoticeContent,
  NoticeIcon,
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
        <NoticeIcon>🎁</NoticeIcon>
        <NoticeContent>
          <Box
            alignItems="center"
            row
            flex={1}
          >
            <span>You have unclaimed vested YAM tokens.</span>
          </Box>
          <Button text="Claim" />
        </NoticeContent>
      </Notice>
      <VestingModal
        isOpen={modalIsOpen}
        onDismiss={handleDismissModal}
      />
    </>
  )
}

export default VestingNotice
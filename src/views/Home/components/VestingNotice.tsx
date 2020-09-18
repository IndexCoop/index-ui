import React from 'react'
import {
  Box,
  Button,
  Notice,
  NoticeContent,
  NoticeIcon,
} from 'react-neu'

const VestingNotice: React.FC = () => {
  return (
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
        <Button text="Claim" to="/migrate" />
      </NoticeContent>
    </Notice>
  )
}

export default VestingNotice
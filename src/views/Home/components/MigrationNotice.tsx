import React from 'react'
import {
  Box,
  Button,
  Notice,
  NoticeContent,
  NoticeIcon,
} from 'react-neu'

const MigrationNotice: React.FC = () => {
  return (
    <Notice>
      <NoticeIcon>🦋</NoticeIcon>
      <NoticeContent>
        <Box
          alignItems="center"
          row
          flex={1}
        >
          <span>You have unmigrated YAMV2 tokens!</span>
        </Box>
        <Button text="Migrate" to="migrate" />
      </NoticeContent>
    </Notice>
  )
}

export default MigrationNotice
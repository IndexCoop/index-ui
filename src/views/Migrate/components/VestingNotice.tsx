import React from 'react'
import {
  Button,
  Notice,
  NoticeContent,
  NoticeIcon,
  Spacer,
} from 'react-neu'

const VestingNotice: React.FC = () => (
  <Notice>
    <NoticeIcon>⚠️</NoticeIcon>
    <NoticeContent>
      <span>Migrated tokens are subject to a vesting schedule before they are claimable.</span>
      <Spacer />
      <Button text="Learn more" variant="secondary" />
    </NoticeContent>
  </Notice>
)

export default VestingNotice
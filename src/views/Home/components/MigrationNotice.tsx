import React from 'react'

import {
  Box,
  Button,
  Notice,
  NoticeContent,
  NoticeIcon,
  Spacer,
} from 'react-neu'
import styled from 'styled-components'

const MigrationNotice: React.FC = () => {
  return (
    <Notice>
      <NoticeIcon>🦋</NoticeIcon>
      <NoticeContent>
        <StyledNoticeContentInner>
          <span>You have unmigrated YAMV2 tokens!</span>
          <Box flex={1} />
          <Spacer size="sm" />
          <Button size="sm" text="Migrate" to="migrate" />
        </StyledNoticeContentInner>
      </NoticeContent>
    </Notice>
  )
}

const StyledNoticeContentInner = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`

export default MigrationNotice
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

const MigrationNotice: React.FC = () => (
  <>
    <Notice>
      <NoticeIcon>⏳</NoticeIcon>
      <NoticeContent>
        <StyledNoticeContentInner>
          <span>
            Please migrate from the expiring pool to the active pool below to
            continue farming INDEX rewards starting December 7th, 12pm PST.
          </span>
        </StyledNoticeContentInner>
      </NoticeContent>
    </Notice>
    <Spacer />
  </>
)

const StyledNoticeContentInner = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`

export default MigrationNotice

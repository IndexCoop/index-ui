import React from 'react'

import { Notice, NoticeContent, NoticeIcon, Spacer } from 'react-neu'

import styled from 'styled-components'

const MigrationNotice: React.FC = () => (
  <>
    <Notice>
      <NoticeIcon>
        <span role='img' aria-label='star'>
          ⚡️
        </span>
      </NoticeIcon>
      <NoticeContent>
        <StyledNoticeContentInner>
          Metaverse Index Liquidity Mining Rewards go live April 8th, 12pm PST.
        </StyledNoticeContentInner>
      </NoticeContent>
    </Notice>
    <Spacer />
  </>
)

const StyledNoticeContentInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`

export default MigrationNotice

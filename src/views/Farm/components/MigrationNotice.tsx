import React from 'react'
import { Notice, NoticeContent, NoticeIcon, Spacer } from 'react-neu'
import styled from 'styled-components'
import ExternalLink from 'components/ExternalLink'

const MigrationNotice: React.FC = () => (
  <>
    <Notice>
      <NoticeIcon>⭐️</NoticeIcon>
      <NoticeContent>
        <StyledNoticeContentInner>
          Liquidity Mining rewards have been extended. No migration is
          necessary.{'\n'}
          <ExternalLink href='https://snapshot.page/#/index/proposal/QmZ7AWrHWrY6T6wsNujTEYNgMwmCjDGhT4bw4SAQR75rXr'>
            Learn more here.{' '}
          </ExternalLink>
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

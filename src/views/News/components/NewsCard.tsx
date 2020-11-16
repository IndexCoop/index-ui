import React from 'react'
import { Container, Spacer } from 'react-neu'
import Page from 'components/Page'
import styled from 'styled-components'

const Vote: React.FC = () => {
  return (
    <Page>
      <Container size='sm'>
        <StyledPageHeader>Vote</StyledPageHeader>
        <Spacer size='sm' />
        <StyledPageSubheader>View and vote on proposals</StyledPageSubheader>
        <Spacer size='md' />
        <StyledSectionHeader>Proposals</StyledSectionHeader>
        <Spacer size='md' />
      </Container>
    </Page>
  )
}

const StyledPageHeader = styled.div`
  color: ${(props) => props.theme.textColor};
  font-size: 48px;
  font-weight: 700;
  width: 100%;
`

const StyledPageSubheader = styled.div`
  color: ${(props) => props.theme.colors.grey[500]};
  font-size: 24px;
  width: 100%;
`

const StyledSectionHeader = styled.div`
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  width: 100%;
  font-weight: 700;
`

export default Vote

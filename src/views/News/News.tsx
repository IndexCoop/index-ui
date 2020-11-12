import React from 'react'
import { Container, Spacer, Card } from 'react-neu'
import Page from 'components/Page'
import styled from 'styled-components'
import HeaderNewsCard from './components/HeaderNewsCard'

const Vote: React.FC = () => {
  return (
    <Page>
      <Container size='lg'>
        <StyledPageHeader>News</StyledPageHeader>
        <Spacer size='sm' />
        <StyledPageSubheader>
          The latest news from the Index Coop
        </StyledPageSubheader>
        <Spacer size='md' />
        <HeaderNewsCard />
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

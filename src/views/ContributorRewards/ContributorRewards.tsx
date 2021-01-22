import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Container, Spacer } from 'react-neu'
import Page from 'components/Page'
import MonthlyClaim from './components/MonthlyClaim'

const ContributorRewards = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [])

  return (
    <Page>
      <Container>
        <StyledPageHeader>Rewards</StyledPageHeader>
        <Spacer size='sm' />
        <StyledPageSubheader>
          Monthly contributor rewards distributor
        </StyledPageSubheader>
        <Spacer />
        <MonthlyClaim />
      </Container>
    </Page>
  )
}

const StyledPageHeader = styled.div`
  color: ${(props) => props.theme.textColor};
  font-size: 48px;
  font-weight: 700;
  text-align: center;
  width: 100%;
`

const StyledPageSubheader = styled.div`
  color: ${(props) => props.theme.colors.grey[500]};
  font-size: 24px;
  text-align: center;
  width: 100%;
`

export default ContributorRewards

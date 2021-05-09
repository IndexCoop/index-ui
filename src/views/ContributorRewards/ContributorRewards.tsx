import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Container, Spacer } from 'react-neu'
import Page from 'components/Page'
import MonthlyClaim from './components/MonthlyClaim'
import { NavLink } from 'react-router-dom'

const ContributorRewards = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  return (
    <Page>
      <Container>
        <StyledPageHeader>Rewards</StyledPageHeader>
        <Spacer size='sm' />
        <StyledPageSubheader>
          Monthly contributor rewards distributor
        </StyledPageSubheader>
        <Spacer size='sm' />
        <StyledPageSubheader>
          <b>Note:</b> Use a web3 wallet only, not a centralized exchange
          account
        </StyledPageSubheader>
        <Spacer size='sm' />
        <StyledPageSubheader>
          If you have further questions, please ask on{' '}
          <StyledLink to='/join'>Discord</StyledLink>
        </StyledPageSubheader>
        <Spacer />
        <MonthlyClaim />
      </Container>
    </Page>
  )
}

const StyledLink = styled(NavLink)`
  color: ${(props) => props.theme.colors.primary.light};
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.grey[600]};
  }
`

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

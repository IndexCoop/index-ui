import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Box, Container, Separator, Spacer } from 'react-neu'

import Page from 'components/Page'
import Split from 'components/Split'

import LegacyFarmCard from './components/Stake/LegacyFarm'
import DpiFarmCard from './components/Stake/DpiFarm'
import RewardsCard from './components/Rewards'
import Treasury from './components/Treasury'
import MigrationNotice from './components/MigrationNotice'

const Farm = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  return (
    <Page>
      <Container>
        <StyledPageHeader>Liquidity Mining Programs</StyledPageHeader>
        <Spacer size='sm' />
        <StyledPageSubheader>
          Earn rewards for supplying liquidity for Index Coop products
        </StyledPageSubheader>
        <Spacer />
        <MigrationNotice />
      </Container>
      <Treasury />
      <Spacer />
      <Container>
        <Split>
          <LegacyFarmCard />
          <DpiFarmCard />
        </Split>
        <Spacer />
        <Separator />
        <Spacer size='lg' />
        <StyledPageHeader>Index Airdrop</StyledPageHeader>
        <Spacer size='sm' />
        <StyledPageSubheader>
          See if you qualify for the Index Airdrop
        </StyledPageSubheader>
        <Spacer />
        <Box row justifyContent='center'>
          <RewardsCard />
        </Box>
        <Spacer size='lg' />
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

export default Farm

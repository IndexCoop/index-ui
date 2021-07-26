import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Box, Container, Separator, Spacer } from 'react-neu'

import Page from 'components/Page'

import LegacyFarmCard from './components/Stake/LegacyFarm'
import DpiFarmCard from './components/Stake/DpiFarm'
import MviFarmCard from './components/Stake/MviFarm'
import RewardsCard from './components/Rewards'
import Treasury from './components/Treasury'
import V3FarmCard from './components/Stake/V3Farm'

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
      </Container>
      <Treasury />
      <Spacer />
      <Container>
        <V3FarmCard />
        <Spacer />
        <DpiFarmCard />
        <Spacer />
        <MviFarmCard />
        <Spacer />
        <LegacyFarmCard />
        <Spacer />
        <Separator />
        <Spacer size='lg' />
        <StyledPageHeader>Index Airdrop</StyledPageHeader>
        <Spacer size='sm' />
        <StyledPageSubheader>
          See if you qualified for the Index Airdrop
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

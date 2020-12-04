import React from 'react'
import styled from 'styled-components'
import { Box, Button, Container, Separator, Spacer } from 'react-neu'

import Page from 'components/Page'
import Split from 'components/Split'

import StakeCard from './components/Stake'
import StakeFarmTwoCard from './components/Stake/StakeFarmTwo'
import RewardsCard from './components/Rewards'
import Treasury from './components/Treasury'

const Farm: React.FC = () => {
  return (
    <Page>
      <Container>
        <StyledPageHeader>Farm</StyledPageHeader>
        <Spacer size='sm' />
        <StyledPageSubheader>
          Earn rewards for supplying DPI liquidity
        </StyledPageSubheader>
      </Container>
      <Spacer />
      <Treasury />
      <Spacer />
      <Container>
        <Split>
          <StakeCard />
          <StakeFarmTwoCard />
        </Split>
        <Spacer />
        <Separator />
        <Spacer size='lg' />
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

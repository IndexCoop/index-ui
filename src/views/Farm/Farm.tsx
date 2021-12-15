import React, { useEffect } from 'react'

import { Box, Container, Separator, Spacer } from 'react-neu'

import styled from 'styled-components'

import Page from 'components/Page'
import { DpiEthRewards, MviEthRewards } from 'constants/v3Farms'

import DpiFarmCard from './components/Stake/DpiFarm'
import LegacyFarmCard from './components/Stake/LegacyFarm'
import MviFarmCard from './components/Stake/MviFarm'
import V3FarmCard from './components/Stake/V3Farm'
import Treasury from './components/Treasury'

const Farm = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  return (
    <Page>
      <Container>
        <StyledPageHeader data-cy='liquidity-mining-title'>
          Liquidity Mining Programs
        </StyledPageHeader>
        <Spacer size='sm' />
        <StyledPageSubheader data-cy='liquidity-mining-subtitle'>
          Earn rewards for supplying liquidity for Index Coop products
        </StyledPageSubheader>
        <Spacer />
      </Container>
      <Treasury data-cy='treasury' />
      <Spacer />
      <Container>
        <V3FarmCard farm={DpiEthRewards} />
        <Spacer />
        <DpiFarmCard />
        <Spacer />
        <MviFarmCard />
        <Spacer />
        <LegacyFarmCard />
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

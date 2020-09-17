import React from 'react'

import {
  Button,
  Card,
  CardContent,
  CardTitle,
  Spacer,
} from 'react-neu'
import styled from 'styled-components'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'

import HarvestCard from './components/Harvest'
import StakeCard from './components/Stake'

const Farm: React.FC = () => {
  return (
    <Page>
      <PageHeader
        icon="🧑‍🌾"
        subtitle="Plant LP tokens and grow YAMs"
        title="Farm"
      />
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <StakeCard />
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper>
            <HarvestCard />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer />
        <Button text="Harvest &amp; Unstake" variant="secondary" />
      </StyledFarm>
    </Page>
  )
}

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`

export default Farm
import React, { useMemo } from 'react'

import {
  Box,
  Button,
  Container,
  Spacer,
} from 'react-neu'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Split from 'components/Split'

import useFarming from 'hooks/useFarming'

import HarvestCard from './components/Harvest'
import StakeCard from './components/Stake'

const Farm: React.FC = () => {
  const { status } = useWallet()
  const {
    isRedeeming,
    onRedeem,
  } = useFarming()

  const RedeemButton = useMemo(() => {
    if (status !== 'connected') {
      return (
        <Button
          disabled
          text="Harvest &amp; Unstake"
          variant="secondary"
        />
      )
    }
    if (!isRedeeming) {
      return (
        <Button
          onClick={onRedeem}
          text="Harvest &amp; Unstake"
        />
      )
    }
    return (
      <Button
        disabled
        text="Redeeming..."
        variant="secondary"
      />
    )
  }, [
    isRedeeming,
    onRedeem,
  ])

  return (
    <Page>
      <PageHeader
        icon="🧑‍🌾"
        subtitle="Plant LP tokens and grow YAMs"
        title="Farm"
      />
      <Container>
        <Split>
          <HarvestCard />
          <StakeCard />
        </Split>
        <Spacer />
        <Box row justifyContent="center">
          {RedeemButton}
        </Box>
      </Container>
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
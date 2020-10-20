import React, { useMemo } from 'react'

import {
  Box,
  Button,
  Container,
  Separator,
  Spacer,
} from 'react-neu'

import useFarming from 'hooks/useFarming'
import useWallet from 'hooks/useWallet'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Split from 'components/Split'

import HarvestCard from './components/Harvest'
import StakeCard from './components/Stake'
import RewardsCard from './components/Rewards'
import Treasury from './components/Treasury'

const Farm: React.FC = () => {
  const { status } = useWallet()
  const { onUnstakeAndHarvest } = useFarming()

  const UnstakeAndHarvestButton = useMemo(() => {
    if (status !== 'connected') {
      return (
        <Button
          disabled
          text="Claim &amp; Unstake"
          variant="secondary"
        />
      )
    }
    return (
      <Button
        onClick={onUnstakeAndHarvest}
        text="Claim &amp; Unstake"
        variant="secondary"
      />
    )
  }, [
    status,
    onUnstakeAndHarvest,
  ])
  const icon = {
    src: 'https://index-dao.s3.amazonaws.com/moon.png',
    alt: 'Moon',
  };

  return (
    <Page>
      <PageHeader
        icon={icon}
        subtitle="Stake ETH/DPI LP tokens and farm INDEX"
        title="Farm"
      />
      <Spacer size="md" />
      <Treasury />
      <Spacer />
      <Container>
        <Split>
          <StakeCard />
          <HarvestCard />
        </Split>
        <Spacer />
        <Box row justifyContent="center">
          {UnstakeAndHarvestButton}
        </Box>
        <Spacer size="lg" />
        <Separator />
        <Spacer size="lg" />
        <Box row justifyContent="center">
          <RewardsCard />
        </Box>
        <Spacer size="lg" />
      </Container>
    </Page>
  )
}

export default Farm

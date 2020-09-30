import React, { useMemo } from 'react'

import {
  Box,
  Button,
  Container,
  Separator,
  Spacer,
} from 'react-neu'

import { useWallet } from 'use-wallet'

import ClaimButton from 'components/ClaimButton'
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
          text="Claim &amp; Unstake"
          variant="secondary"
        />
      )
    }
    if (!isRedeeming) {
      return (
        <Button
          onClick={onRedeem}
          text="Claim &amp; Unstake"
          variant="secondary"
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
        icon="🌝"
        subtitle="Stake ETH/DPI LP tokens and farm INDEX"
        title="Farm"
      />
      <Container>
        <Split>
          <StakeCard />
          <HarvestCard />
        </Split>
        <Spacer />
        <Box row justifyContent="center">
          {RedeemButton}
          <Spacer />
          <ClaimButton />
        </Box>
        <Spacer size="lg" />
        <Separator />
        <Spacer size="lg" />
        <Split>
          <Button
            full
            text="Buy yUSD"
            href="https://app.uniswap.org/#/swap?inputCurrency=0x5dbcf33d8c2e976c6b560249878e6f1491bca25c&outputCurrency=ETH"
            variant="tertiary"
          />
          <Button
            full
            text="Mint yUSD"
            href="https://zapper.fi/invest"
            variant="tertiary"
          />
          <Button
            full
            text="Get YAM/yUSD LP tokens"
            href="https://app.uniswap.org/#/add/0x0aacfbec6a24756c20d41914f2caba817c0d8521/0x5dbcf33d8c2e976c6b560249878e6f1491bca25c"
            variant="tertiary"
          />
        </Split>
      </Container>
    </Page>
  )
}

export default Farm
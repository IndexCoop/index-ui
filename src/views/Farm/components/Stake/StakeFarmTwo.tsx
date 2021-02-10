import React, { useCallback, useMemo, useState } from 'react'
import numeral from 'numeral'
import { Button, Card, CardActions, CardContent, Spacer } from 'react-neu'
import styled from 'styled-components'

import useBalances from 'hooks/useBalances'
import useFarmingTwo from 'hooks/useFarmingTwo'
import usePrices from 'hooks/usePrices'
import useWallet from 'hooks/useWallet'

import StakeModal from './components/StakeModal'

const Stake: React.FC = () => {
  const [stakeModalIsOpen, setStakeModalIsOpen] = useState(false)

  const {
    stakedFarmTwoBalance: stakedBalance,
    unharvestedFarmTwoBalance,
  } = useBalances()
  const { status } = useWallet()
  const {
    isApproved,
    isApproving,
    onApprove,
    onStake,
    onUnstakeAndHarvest,
    onHarvest,
  } = useFarmingTwo()
  const { farmTwoApy } = usePrices()

  const handleDismissStakeModal = useCallback(() => {
    setStakeModalIsOpen(false)
  }, [setStakeModalIsOpen])

  const handleOnStake = useCallback(
    (amount: string) => {
      onStake(amount)
      handleDismissStakeModal()
    },
    [handleDismissStakeModal, onStake]
  )

  const handleStakeClick = useCallback(() => {
    setStakeModalIsOpen(true)
  }, [setStakeModalIsOpen])

  const StakeButton = useMemo(() => {
    if (status !== 'connected') {
      return <Button disabled full text='Stake' variant='secondary' />
    }
    if (!isApproved) {
      return (
        <Button
          disabled={isApproving}
          full
          onClick={onApprove}
          text={!isApproving ? 'Approve staking' : 'Approving staking...'}
          variant={
            isApproving || status !== 'connected' ? 'secondary' : 'default'
          }
        />
      )
    }

    if (isApproved) {
      return <Button full onClick={handleStakeClick} text='Stake' />
    }
  }, [isApproved, isApproving, status, handleStakeClick, onApprove])

  const UnstakeButton = useMemo(() => {
    const hasStaked = stakedBalance && stakedBalance.toNumber() > 0
    if (status !== 'connected' || !hasStaked) {
      return <Button disabled full text='Unstake & Claim' variant='secondary' />
    }

    return (
      <Button
        full
        onClick={onUnstakeAndHarvest}
        text='Unstake & Claim'
        variant='secondary'
      />
    )
  }, [stakedBalance, status, onUnstakeAndHarvest])

  const ClaimButton = useMemo(() => {
    if (status !== 'connected') {
      return <Button disabled full text='Claim' variant='secondary' />
    }
    return <Button full onClick={onHarvest} text='Claim' />
  }, [status, onHarvest])

  const formattedStakedBalance = useMemo(() => {
    if (stakedBalance) {
      return numeral(stakedBalance.toString()).format('0.00000a')
    } else {
      return '--'
    }
  }, [stakedBalance])

  const formattedEarnedBalance = useMemo(() => {
    if (unharvestedFarmTwoBalance) {
      return numeral(unharvestedFarmTwoBalance.toString()).format('0.00000a')
    } else {
      return '--'
    }
  }, [unharvestedFarmTwoBalance])

  return (
    <>
      <Card>
        <CardContent>
          <StyledHeaderIcon
            alt='active icon'
            src='https://index-dao.s3.amazonaws.com/up-arrow.svg'
          />
          <Spacer size='sm' />
          <StyledCardTitle>Active Pool</StyledCardTitle>
          <Spacer size='sm' />
          <StyledCardText>Active Feb. 6th - Mar. 8th</StyledCardText>
          <Spacer />
          <StyledSectionTitle>
            {formattedStakedBalance}
            <StyledTokenIcon
              alt='eth dpi icon'
              src='https://index-dao.s3.amazonaws.com/eth-dpi.svg'
            />
          </StyledSectionTitle>
          <StyledSectionLabel>
            Staked ETH/DPI Uniswap LP Tokens
          </StyledSectionLabel>
          <Spacer />
          <StyledSectionTitle>{farmTwoApy}% APY</StyledSectionTitle>
          <StyledSectionLabel>(Unstable)</StyledSectionLabel>
          <Spacer />
          <StyledSectionTitle>
            {formattedEarnedBalance}
            <StyledTokenIcon
              alt='owl icon'
              src='https://index-dao.s3.amazonaws.com/owl.png'
            />
          </StyledSectionTitle>
          <StyledSectionLabel>Unclaimed INDEX in pool</StyledSectionLabel>
          <Spacer />
        </CardContent>
        <CardActions>
          {ClaimButton}
          {StakeButton}
        </CardActions>
        <CardActions>{UnstakeButton}</CardActions>
      </Card>
      <StakeModal
        isOpen={stakeModalIsOpen}
        onDismiss={handleDismissStakeModal}
        onStake={handleOnStake}
      />
    </>
  )
}

const StyledHeaderIcon = styled.img`
  height: 58px;
  width: 58px;
`

const StyledTokenIcon = styled.img`
  height: 20px;
  margin-left: 10px;
`

const StyledCardTitle = styled.span`
  font-weight: 600;
  font-size: 28px;
`

const StyledCardText = styled.span`
  color: ${(props) => props.theme.colors.grey[500]};
  font-weight: 600;
  font-size: 18px;
`

const StyledSectionTitle = styled.span`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 24px;
`
const StyledSectionLabel = styled.span`
  color: ${(props) => props.theme.colors.grey[500]};
  font-size: 16px;
`

export default Stake

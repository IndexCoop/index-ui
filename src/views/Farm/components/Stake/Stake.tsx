import React, { useCallback, useMemo, useState } from 'react'
import numeral from 'numeral'
import { Button, Card, CardActions, CardContent, Spacer } from 'react-neu'
import styled from 'styled-components'

import useBalances from 'hooks/useBalances'
import useFarming from 'hooks/useFarming'
import usePrices from 'hooks/usePrices'
import useWallet from 'hooks/useWallet'

import StakeModal from './components/StakeModal'
import UnstakeModal from './components/UnstakeModal'

const Stake: React.FC = () => {
  const [stakeModalIsOpen, setStakeModalIsOpen] = useState(false)
  const [unstakeModalIsOpen, setUnstakeModalIsOpen] = useState(false)

  const {
    stakedUniswapEthDpiLpBalance: stakedBalance,
    unharvestedIndexBalance,
  } = useBalances()
  const { status } = useWallet()
  const {
    isApproved,
    isApproving,
    onApprove,
    onStake,
    onUnstakeAndHarvest,
  } = useFarming()
  const { apy } = usePrices()

  const handleDismissStakeModal = useCallback(() => {
    setStakeModalIsOpen(false)
  }, [setStakeModalIsOpen])

  const handleDismissUnstakeModal = useCallback(() => {
    setUnstakeModalIsOpen(false)
  }, [setUnstakeModalIsOpen])

  const handleOnStake = useCallback(
    (amount: string) => {
      onStake(amount)
      handleDismissStakeModal()
    },
    [handleDismissStakeModal, onStake]
  )

  const handleOnUnstake = useCallback(() => {
    onUnstakeAndHarvest()
    handleDismissUnstakeModal()
  }, [handleDismissUnstakeModal, onUnstakeAndHarvest])

  const handleStakeClick = useCallback(() => {
    setStakeModalIsOpen(true)
  }, [setStakeModalIsOpen])

  const handleUnstakeClick = useCallback(() => {
    setUnstakeModalIsOpen(true)
  }, [setUnstakeModalIsOpen])

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
        onClick={handleUnstakeClick}
        text='Unstake & Claim'
        variant='secondary'
      />
    )
  }, [stakedBalance, status, handleUnstakeClick])

  const formattedStakedBalance = useMemo(() => {
    if (stakedBalance) {
      return numeral(stakedBalance.toString()).format('0.00000a')
    } else {
      return '--'
    }
  }, [stakedBalance])

  const formattedEarnedBalance = useMemo(() => {
    if (unharvestedIndexBalance) {
      return numeral(unharvestedIndexBalance.toString()).format('0.00000a')
    } else {
      return '--'
    }
  }, [unharvestedIndexBalance])

  return (
    <>
      <Card>
        <CardContent>
          <StyledHeaderIcon
            alt='expiring icon'
            src='https://index-dao.s3.amazonaws.com/down-arrow.svg'
          />
          <Spacer size='sm' />
          <StyledCardTitle>Expiring Pool</StyledCardTitle>
          <Spacer size='sm' />
          <StyledCardText>Active Oct. 7th - Dec. 6th</StyledCardText>
          <Spacer />
          <StyledSectionTitle>
            {formattedStakedBalance}
            <StyledTokenIcon
              alt='eth dpi icon'
              src='https://index-dao.s3.amazonaws.com/eth-dpi.svg'
            />
          </StyledSectionTitle>
          <StyledSectionLabel>
            (Staked ETH/DPI Uniswap LP Tokens)
          </StyledSectionLabel>
          <Spacer />
          <StyledSectionTitle>{apy}% APY</StyledSectionTitle>
          <StyledSectionLabel>(Unstable)</StyledSectionLabel>
          <Spacer />
          <StyledSectionTitle>
            {formattedEarnedBalance}
            <StyledTokenIcon
              alt='owl icon'
              src='https://index-dao.s3.amazonaws.com/owl.png'
            />
          </StyledSectionTitle>
          <StyledSectionLabel>
            Unclaimed INDEX in expiring pool
          </StyledSectionLabel>
          <Spacer />
        </CardContent>
        <CardActions>{StakeButton}</CardActions>
        <CardActions>{UnstakeButton}</CardActions>
      </Card>
      <StakeModal
        isOpen={stakeModalIsOpen}
        onDismiss={handleDismissStakeModal}
        onStake={handleOnStake}
      />
      <UnstakeModal
        isOpen={unstakeModalIsOpen}
        onDismiss={handleDismissUnstakeModal}
        onUnstake={handleOnUnstake}
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

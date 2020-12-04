import React, { useCallback, useMemo, useState } from 'react'
import numeral from 'numeral'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardIcon,
  Spacer,
} from 'react-neu'
import styled from 'styled-components'

import Label from 'components/Label'
import Value from 'components/Value'

import useBalances from 'hooks/useBalances'
import useFarming from 'hooks/useFarming'
import usePrices from 'hooks/usePrices'
import useWallet from 'hooks/useWallet'

import StakeModal from './components/StakeModal'
import UnstakeModal from './components/UnstakeModal'

const Stake: React.FC = () => {
  const [stakeModalIsOpen, setStakeModalIsOpen] = useState(false)
  const [unstakeModalIsOpen, setUnstakeModalIsOpen] = useState(false)

  const { stakedUniswapEthDpiLpBalance: stakedBalance } = useBalances()
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

  return (
    <>
      <Card>
        <CardIcon>
          <StyledIcon
            alt='expiring icon'
            src='https://index-dao.s3.amazonaws.com/chick.png'
          />
        </CardIcon>
        <CardContent>
          <Box alignItems='center' column>
            <Value value={formattedStakedBalance} />
            <Label text='Staked Uniswap ETH/DPI LP Tokens' />
          </Box>
          <Spacer />
          <Box alignItems='center' column>
            <StyledAPYQuantity>{apy}% APY</StyledAPYQuantity>
            <StyledAPYLabel>(Unstable)</StyledAPYLabel>
          </Box>
        </CardContent>
        <CardActions>
          {UnstakeButton}
          {StakeButton}
        </CardActions>
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

const StyledIcon = styled.img`
  height: 58px;
  text-align: center;
  min-width: 58px;
`

const StyledAPYQuantity = styled.span`
  color: ${(props) => props.theme.colors.grey};
  font-weight: 600;
  font-size: 28px;
`
const StyledAPYLabel = styled.span`
  color: ${(props) => props.theme.colors.grey};
  font-size: 20px;
`

export default Stake

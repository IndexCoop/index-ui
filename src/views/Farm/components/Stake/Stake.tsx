import React, { useCallback, useMemo, useState } from 'react'

import numeral from 'numeral'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardIcon,
} from 'react-neu'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'

import ConfirmTxModal from 'components/ConfirmTransactionModal'
import Label from 'components/Label'
import Value from 'components/Value'

import useFarming from 'hooks/useFarming'
import useYam from 'hooks/useYam'

import { bnToDec } from 'utils'

import StakeModal from './components/StakeModal'
import UnstakeModal from './components/UnstakeModal'

const Stake: React.FC = () => {
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false)
  const [stakeModalIsOpen, setStakeModalIsOpen] = useState(false)
  const [unstakeModalIsOpen, setUnstakeModalIsOpen] = useState(false)

  const { status } = useWallet()
  const {
    isApproved,
    isApproving,
    isStaking,
    isUnstaking,
    onApprove,
    onStake,
    onUnstake,
    stakedBalance,
  } = useFarming()

  const handleDismissStakeModal = useCallback(() => {
    setStakeModalIsOpen(false)
  }, [setStakeModalIsOpen])

  const handleDismissUnstakeModal = useCallback(() => {
    setUnstakeModalIsOpen(false)
  }, [setUnstakeModalIsOpen])

  const handleOnStake = useCallback((amount: string) => {
    onStake(amount)
    handleDismissStakeModal()
  }, [handleDismissStakeModal, onStake])

  const handleStakeClick = useCallback(() => {
    setStakeModalIsOpen(true)
  }, [setStakeModalIsOpen])

  const handleUnstakeClick = useCallback(() => {
    setUnstakeModalIsOpen(true)
  }, [setUnstakeModalIsOpen])

  const StakeButton = useMemo(() => {
    if (status !== 'connected') {
      return (
        <Button
          disabled
          full
          text="Stake"
          variant="secondary"
        />
      )
    }
    if (isStaking) {
      return (
        <Button
          disabled
          full
          text="Staking..."
          variant="secondary"
        />
      )
    }
    if (!isApproved) {
      return (
        <Button
          disabled={isApproving}
          full
          onClick={onApprove}
          text={!isApproving ? "Approve staking" : "Approving staking..."}
          variant={isApproving || status !== 'connected' ? 'secondary' : 'default'}
        />
      )
    }
    if (isApproved) {
      return (
        <Button
          full
          onClick={handleStakeClick}
          text="Stake"
        />
      )
    }
  }, [
    isApproving,
    onApprove,
    status,
  ])

  const UnstakeButton = useMemo(() => {
    if (!isApproved) {
      return <Button disabled full text="Unstake" variant="secondary" />
    }
  }, [])

  const formattedStakedBalance = useMemo(() => {
    if (stakedBalance) {
      return numeral(bnToDec(stakedBalance)).format('0.00a')
    } else {
      return '--'
    }
  }, [stakedBalance])

  return (
    <>
      <Card>
        <CardIcon>🌱</CardIcon>
        <CardContent>
          <Box
            alignItems="center"
            column
          >
            <Value value={formattedStakedBalance} />
            <Label text="Planted YUSD-YAM LP Tokens" />
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
      />
      <ConfirmTxModal isOpen={confirmTxModalIsOpen} />
    </>
  )
}

const StyledButtons = styled.div`
  display: flex;
`
const StyledButton = styled.div`
  flex: 1;
`

export default Stake
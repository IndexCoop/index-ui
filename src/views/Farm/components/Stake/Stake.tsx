import React, { useCallback, useState } from 'react'

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardIcon,
} from 'react-neu'
import styled from 'styled-components'

import ConfirmTxModal from 'components/ConfirmTransactionModal'
import Label from 'components/Label'
import Value from 'components/Value'

import useFarming from 'hooks/useFarming'
import useYam from 'hooks/useYam'

import StakeModal from './components/StakeModal'
import UnstakeModal from './components/UnstakeModal'

const Stake: React.FC = () => {
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false)
  const [stakeModalIsOpen, setStakeModalIsOpen] = useState(false)
  const [unstakeModalIsOpen, setUnstakeModalIsOpen] = useState(false)

  const { onStake } = useFarming()
  const yam = useYam()

  const handleDismissStakeModal = useCallback(() => {
    setStakeModalIsOpen(false)
  }, [setStakeModalIsOpen])

  const handleDismissUnstakeModal = useCallback(() => {
    setUnstakeModalIsOpen(false)
  }, [setUnstakeModalIsOpen])

  const handleStakeClick = useCallback(() => {
    setStakeModalIsOpen(true)
  }, [setStakeModalIsOpen])

  const handleUnstakeClick = useCallback(() => {
    setUnstakeModalIsOpen(true)
  }, [setUnstakeModalIsOpen])

  const handleStake = useCallback((amount: string) => {
    onStake(amount)
  }, [onStake])

  return (
    <>
      <Card>
        <CardIcon>🌱</CardIcon>
        <CardContent>
          <Box
            alignItems="center"
            column
          >
            <Value value="--" />
            <Label text="Planted YUSD-YAM LP Tokens" />
          </Box>
        </CardContent>
        <CardActions>
          <Button
            full
            onClick={handleUnstakeClick}
            text="Unplant"
            variant="secondary"
          />
          <Button
            full
            onClick={handleStakeClick}
            text="Plant"
          />
        </CardActions>
      </Card>
      <StakeModal
        isOpen={stakeModalIsOpen}
        onDismiss={handleDismissStakeModal}
        onStake={handleStake}
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
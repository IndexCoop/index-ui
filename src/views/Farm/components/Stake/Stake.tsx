import React, { useCallback, useState } from 'react'

import {
  Button,
  Card,
  CardActions,
  CardContent,
} from 'react-neu'
import styled from 'styled-components'

import FancyValue from 'components/FancyValue'

import StakeModal from './components/StakeModal'
import UnstakeModal from './components/UnstakeModal'

const Stake: React.FC = () => {
  const [stakeModalIsOpen, setStakeModalIsOpen] = useState(false)
  const [unstakeModalIsOpen, setUnstakeModalIsOpen] = useState(false)

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

  return (
    <>
      <Card>
        <CardContent>
          <FancyValue
            icon="🌱"
            label="Staked YAM-YUSD LP Tokens"
            value="--"
          />
        </CardContent>
        <CardActions>
          <Button
            full
            onClick={handleUnstakeClick}
            text="Unstake"
            variant="secondary"
          />
          <Button
            full
            onClick={handleStakeClick}
            text="Stake"
          />
        </CardActions>
      </Card>
      <StakeModal
        isOpen={stakeModalIsOpen}
        onDismiss={handleDismissStakeModal}
      />
      <UnstakeModal
        isOpen={unstakeModalIsOpen}
        onDismiss={handleDismissUnstakeModal}
      />
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
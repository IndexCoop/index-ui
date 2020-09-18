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

import Label from 'components/Label'
import Value from 'components/Value'

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
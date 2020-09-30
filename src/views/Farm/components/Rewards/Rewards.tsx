import React, { useCallback, useMemo, useState } from 'react'

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardIcon,
  Spacer,
} from 'react-neu'
import { useWallet } from 'use-wallet'

import Label from 'components/Label'

import RewardsModal from './components/RewardsModal'

const Rewards: React.FC = () => {
  const [claimModalIsOpen, setClaimModalIsOpen] = useState(false)

  const { account, status } = useWallet()

  const handleClaimClick = useCallback(() => {
    setClaimModalIsOpen(true)
  }, [setClaimModalIsOpen])

  const handleDismissClaimModal = useCallback(() => {
    setClaimModalIsOpen(false)
  }, [setClaimModalIsOpen])

  return (
    <>
      <Card>
        <CardIcon>🎁</CardIcon>
        <CardContent>
          <Box
            alignItems="center"
            column
          >
            <Label text="Claim Your INDEX Rewards" />
          </Box>
        </CardContent>
        <CardActions>
          <Button
            disabled={status !== 'connected'}
            onClick={status !== 'connected' ? () => {} : handleClaimClick}
            text="Claim INDEX"
            variant="secondary"
          />
          <Button
            disabled={status !== 'connected'}
            onClick={status !== 'connected' ? () => {} : handleClaimClick}
            text="Claim INDEX"
            variant="secondary"
          />
        </CardActions>
      </Card>
      <RewardsModal
        isOpen={claimModalIsOpen}
        onDismiss={handleDismissClaimModal}
      />
    </>
  )
}

export default Rewards
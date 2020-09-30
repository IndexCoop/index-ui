import React, { useCallback, useMemo, useState } from 'react'

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardIcon,
} from 'react-neu'
import { useWallet } from 'use-wallet'

import Label from 'components/Label'
import Value from 'components/Value'

import RewardsModal from './components/RewardsModal'
import ExternalRewardsModal from './components/ExternalRewardsModal'

const Rewards: React.FC = () => {
  const [claimModalIsOpen, setClaimModalIsOpen] = useState(false)
  const [externalClaimModalIsOpen, setExternalClaimModalIsOpen] = useState(false)

  const { account, status } = useWallet()

  const handleClaimClick = useCallback(() => {
    setClaimModalIsOpen(true)
  }, [setClaimModalIsOpen])

  const handleDismissClaimModal = useCallback(() => {
    setClaimModalIsOpen(false)
  }, [setClaimModalIsOpen])

  const handleExternalClaimClick = useCallback(() => {
    setExternalClaimModalIsOpen(true)
  }, [setExternalClaimModalIsOpen])

  const handleDismissExternalClaimModal = useCallback(() => {
    setExternalClaimModalIsOpen(false)
  }, [setExternalClaimModalIsOpen])

  return (
    <>
      <Card>
        <CardIcon>🎁</CardIcon>
        <CardContent>
          <Box
            alignItems="center"
            column
          >
            <Value value={'100'} />
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
            onClick={status !== 'connected' ? () => {} : handleExternalClaimClick}
            text="Claim Externally"
            variant="secondary"
          />
        </CardActions>
      </Card>
      <RewardsModal
        isOpen={claimModalIsOpen}
        onDismiss={handleDismissClaimModal}
      />
      <ExternalRewardsModal
        isOpen={externalClaimModalIsOpen}
        onDismiss={handleDismissExternalClaimModal}
      />
    </>
  )
}

export default Rewards
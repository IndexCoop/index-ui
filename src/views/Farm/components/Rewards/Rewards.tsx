import React, { useCallback, useMemo, useState } from 'react'

import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardIcon,
  Spacer,
} from 'react-neu'
import { useWallet } from 'use-wallet'

import ClaimButton from 'components/ClaimButton'
import Label from 'components/Label'

import RewardsModal from './components/RewardsModal'

const Rewards: React.FC = () => {
  const [claimModalIsOpen, setClaimModalIsOpen] = useState(false)

  const { account, status } = useWallet()

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
          <ClaimButton />
          <Spacer />
          <ClaimButton />
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
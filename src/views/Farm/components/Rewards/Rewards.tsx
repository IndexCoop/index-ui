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

import RewardsModal from './components/RewardsModal'
import ExternalRewardsModal from './components/ExternalRewardsModal'

import useAirdrop from 'hooks/useAirdrop'
import useWallet from 'hooks/useWallet'

const Rewards: React.FC = () => {
  const [claimModalIsOpen, setClaimModalIsOpen] = useState(false)
  const [externalClaimModalIsOpen, setExternalClaimModalIsOpen] = useState(
    false
  )

  const { claimableQuantity, isClaimable } = useAirdrop()

  const { status } = useWallet()

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

  const isWalletConnected = status === 'connected'

  return (
    <>
      <Card>
        <CardIcon>
          <StyledIcon
            alt="Present icon"
            src="https://index-dao.s3.amazonaws.com/present.png"
          />
        </CardIcon>
        <CardContent>
          <Box alignItems='center' column>
            <Value value={claimableQuantity?.toString() || '--'} />
            <Label text='Claim Your INDEX Rewards' />
          </Box>
        </CardContent>
        <CardActions>
          <Button
            disabled={!isWalletConnected || !isClaimable}
            onClick={isWalletConnected ? handleClaimClick : () => {}}
            text='Claim INDEX'
            variant='secondary'
          />
          <Button
            disabled={!isWalletConnected}
            onClick={
              isWalletConnected ? handleExternalClaimClick : () => {}
            }
            text='Claim Externally'
            variant='secondary'
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

const StyledIcon = styled.img`
  height: 58px;
  text-align: center;
  min-width: 58px;
`

export default Rewards

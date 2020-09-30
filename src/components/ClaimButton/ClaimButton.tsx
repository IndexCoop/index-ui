import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import { Button } from 'react-neu'
import { useWallet } from 'use-wallet'

import ClaimModal from 'components/ClaimModal'

interface ClaimButtonProps {}

const ClaimButton: React.FC<ClaimButtonProps> = (props) => {

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
      <Button
        disabled={status !== 'connected'}
        onClick={status !== 'connected' ? () => {} : handleClaimClick}
        text="Claim INDEX"
        variant="secondary"
      />
      <ClaimModal
        isOpen={claimModalIsOpen}
        onDismiss={handleDismissClaimModal}
      />
    </>
  )
}

export default ClaimButton
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import { Button } from 'react-neu'
import { useWallet } from 'use-wallet'

import AccountModal from './AccountModal'

interface AccountButtonProps {}

const AccountButton: React.FC<AccountButtonProps> = (props) => {
  
  const [accountModalIsOpen, setAccountModalIsOpen] = useState(false)
  const [unlockModalIsOpen, setUnlockModalIsOpen] = useState(false)

  const { account } = useWallet()

  const handlePresentAccountModal = useCallback(() => {
    setAccountModalIsOpen(true)
  }, [setAccountModalIsOpen])

  const handleDismissAccountModal = useCallback(() => {
    setAccountModalIsOpen(false)
  }, [setAccountModalIsOpen])

  return (
    <>
      <StyledAccountButton>
        {!account ? (
          <Button
            onClick={handlePresentAccountModal}
            size="sm"
            text="Unlock Wallet"
          />
        ) : (
          <Button
            onClick={handlePresentAccountModal}
            size="sm"
            text="My Wallet"
          />
        )}
      </StyledAccountButton>
      <AccountModal isOpen={accountModalIsOpen} />
    </>
  )
}

const StyledAccountButton = styled.div``

export default AccountButton
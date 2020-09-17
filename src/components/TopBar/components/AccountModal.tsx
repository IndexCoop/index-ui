import React from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'

import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle,
  Separator,
  Spacer
} from 'react-neu'

interface AccountModalProps {
  isOpen?: boolean
}

const AccountModal: React.FC<AccountModalProps> = ({ isOpen }) => {

  const { account, reset } = useWallet()

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text="My Account" />
      <ModalContent>
        <Spacer />

        <div style={{ display: 'flex' }}>
          <StyledBalanceWrapper>
            <StyledBalance>
            </StyledBalance>
          </StyledBalanceWrapper>
        </div>

        <Spacer />
        <Button
          href={`https://etherscan.io/address/${account}`}
          text="View on Etherscan"
          variant="secondary"
        />
        <Spacer />
        <Button
          text="Sign out"
          variant="secondary"
        />
      </ModalContent>
      <ModalActions>
        <Button text="Cancel" />
      </ModalActions>
    </Modal>
  )
}

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: ${props => props.theme.spacing[4]}px;
`

export default AccountModal
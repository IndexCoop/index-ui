import React, { useMemo } from 'react'
import {
  Modal,
  ModalContent,
  ModalProps,
  Spacer,
} from 'react-neu'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'

import metamaskLogo from 'assets/metamask-fox.svg'
import walletConnectLogo from 'assets/wallet-connect.svg'

interface ConfirmationModalProps extends ModalProps {
  isPending?: boolean
  isCompleted?: boolean
  isFailed?: boolean
}

const ConfirmTransactionModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  isPending,
  isCompleted,
  isFailed,
}) => {
  const { connector } = useWallet()

  const WalletLogo = useMemo(() => {
    if (connector === 'injected') {
      return <img src={metamaskLogo} height={96} />
    } else if (connector === 'walletconnect') {
      return <img src={walletConnectLogo} height={72} />
    }
  }, [connector])

  if (isFailed) {
    return (
      <Modal isOpen={isOpen}>
        <ModalContent>
          {WalletLogo}
          <Spacer />
          <StyledText>Your transaction could not be processed.</StyledText>
        </ModalContent>
      </Modal>
    )
  }

  if (isCompleted) {
    return (
      <Modal isOpen={isOpen}>
        <ModalContent>
          {WalletLogo}
          <Spacer />
          <StyledText>Your transaction succeeded.</StyledText>
        </ModalContent>
      </Modal>
    )
  }

  if (isPending) {
    return (
      <Modal isOpen={isOpen}>
        <ModalContent>
          {WalletLogo}
          <Spacer />
          <StyledText>Your transaction is being processed.</StyledText>
        </ModalContent>
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalContent>
        {WalletLogo}
        <Spacer />
        <StyledText>Confirm transaction in wallet.</StyledText>
      </ModalContent>
    </Modal>
  )
}

const StyledText = styled.div`
  font-size: 24px;
  text-align: center;
`

export default ConfirmTransactionModal
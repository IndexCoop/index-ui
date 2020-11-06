import React, { useMemo } from 'react'
import {
  ModalContent,
  ModalProps,
  Spacer,
  Button,
  ModalActions,
} from 'react-neu'
import styled from 'styled-components'
import useWallet from 'hooks/useWallet'

import Modal from 'components/CustomModal'
import { TransactionStatusType } from 'components/TransactionWatcher'

import metamaskLogo from 'assets/metamask-fox.svg'
import walletConnectLogo from 'assets/wallet-connect.svg'

interface ConfirmationModalProps extends ModalProps {
  transactionMiningStatus?: TransactionStatusType
}

const ConfirmTransactionModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  transactionMiningStatus,
  onDismiss,
}) => {
  const { connector } = useWallet()

  const WalletLogo = useMemo(() => {
    if (connector === 'injected') {
      return <img src={metamaskLogo} height={96} />
    } else if (connector === 'walletconnect') {
      return <img src={walletConnectLogo} height={72} />
    }
  }, [connector])

  switch (transactionMiningStatus) {
    case TransactionStatusType.IS_UNSTARTED:
    case TransactionStatusType.IS_APPROVING:
      return (
        <Modal isOpen={isOpen}>
          <ModalContent>
            {WalletLogo}
            <Spacer />
            <StyledText>Confirm transaction in your wallet.</StyledText>
          </ModalContent>
        </Modal>
      )
    case TransactionStatusType.IS_PENDING:
      return (
        <Modal isOpen={isOpen}>
          <ModalContent>
            {WalletLogo}
            <Spacer />
            <StyledText>Your transaction is processing.</StyledText>
          </ModalContent>
        </Modal>
      )
    case TransactionStatusType.IS_COMPLETED:
      return (
        <Modal isOpen={isOpen}>
          <ModalContent>
            {WalletLogo}
            <Spacer />
            <StyledText>Your transaction succeeded.</StyledText>
          </ModalContent>
          <ModalActions>
            <Button text='Close' variant='secondary' onClick={onDismiss} />
          </ModalActions>
        </Modal>
      )
    case TransactionStatusType.IS_FAILED:
      return (
        <Modal isOpen={isOpen}>
          <ModalContent>
            {WalletLogo}
            <Spacer />
            <StyledText>Your transaction could not be processed.</StyledText>
          </ModalContent>
          <ModalActions>
            <Button text='Close' variant='secondary' onClick={onDismiss} />
          </ModalActions>
        </Modal>
      )
    default:
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
}

const StyledText = styled.div`
  font-size: 24px;
  text-align: center;
`

export default ConfirmTransactionModal

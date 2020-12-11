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
import ExternalLink from 'components/ExternalLink'
import { TransactionStatusType } from 'components/TransactionWatcher'
import { makeEtherscanLink } from 'utils/index'

import metamaskLogo from 'assets/metamask-fox.svg'
import walletConnectLogo from 'assets/wallet-connect.svg'

interface ConfirmationModalProps extends ModalProps {
  transactionId?: string
  transactionMiningStatus?: TransactionStatusType
}

const ConfirmTransactionModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  transactionId,
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

  const etherscanLink = useMemo(() => {
    if (!transactionId) return

    const etherscanUrl = makeEtherscanLink(transactionId)

    return (
      <>
        <Spacer />
        <ExternalLink href={etherscanUrl} target='_blank' textAlign='center'>
          View the transaction{' '}
          <img src='https://index-dao.s3.amazonaws.com/external-arrow.svg' />
        </ExternalLink>
      </>
    )
  }, [transactionId])

  switch (transactionMiningStatus) {
    case TransactionStatusType.IS_UNSTARTED:
    case TransactionStatusType.IS_APPROVING:
      return (
        <Modal isOpen={isOpen}>
          <ModalContent>
            {WalletLogo}
            <Spacer />
            <StyledText>Confirm transaction in your wallet.</StyledText>
            <Spacer />
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
            {etherscanLink}
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
            {etherscanLink}
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
            {etherscanLink}
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
            <Spacer />
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

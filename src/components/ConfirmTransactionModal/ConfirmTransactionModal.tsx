import React, { useMemo } from 'react'

import {
  Button,
  ModalActions,
  ModalContent,
  ModalProps,
  Spacer,
} from 'react-neu'

import styled from 'styled-components'

import metamaskLogo from 'assets/metamask-fox.svg'
import walletConnectLogo from 'assets/wallet-connect.svg'
import Modal from 'components/CustomModal'
import ExternalLink from 'components/ExternalLink'
import { TransactionStatusType } from 'components/TransactionWatcher'
import useWallet from 'hooks/useWallet'
import { makeEtherscanLink } from 'utils/index'

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
  const { connector, chainId } = useWallet()

  const WalletLogo = useMemo(() => {
    if (connector === 'injected') {
      return <img alt='metamaskLogo' src={metamaskLogo} height={96} />
    } else if (connector === 'walletconnect') {
      return <img alt='walletConnectLogo' src={walletConnectLogo} height={72} />
    }
  }, [connector])

  const etherscanLink = useMemo(() => {
    if (!transactionId) return

    const etherscanUrl = makeEtherscanLink(transactionId, chainId)

    return (
      <>
        <Spacer />
        <ExternalLink href={etherscanUrl} target='_blank' textAlign='center'>
          View the transaction{' '}
          <img
            alt='arrow'
            src='https://index-dao.s3.amazonaws.com/external-arrow.svg'
          />
        </ExternalLink>
      </>
    )
  }, [chainId, transactionId])

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

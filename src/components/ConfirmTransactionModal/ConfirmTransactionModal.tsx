import React, { useMemo } from "react";
import { Modal, ModalContent, ModalProps, Spacer } from "react-neu";
import styled from "styled-components";
import { useWallet } from "use-wallet";

import metamaskLogo from "assets/metamask-fox.svg";
import walletConnectLogo from "assets/wallet-connect.svg";

export enum TransactionStatusType {
  IS_UNSTARTED,
  IS_APPROVING,
  IS_PENDING,
  IS_COMPLETED,
  IS_FAILED,
}

interface ConfirmationModalProps extends ModalProps {
  transactionMiningStatus?: TransactionStatusType;
}

const ConfirmTransactionModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  transactionMiningStatus,
  onDismiss,
}) => {
  const { connector } = useWallet();

  const WalletLogo = useMemo(() => {
    if (connector === "injected") {
      return <img src={metamaskLogo} height={96} />;
    } else if (connector === "walletconnect") {
      return <img src={walletConnectLogo} height={72} />;
    }
  }, [connector]);

  let text;
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
      );
    case TransactionStatusType.IS_PENDING:
      return (
        <Modal isOpen={isOpen}>
          <ModalContent>
            {WalletLogo}
            <Spacer />
            <StyledText>Your transaction is processing.</StyledText>
          </ModalContent>
        </Modal>
      );
    case TransactionStatusType.IS_COMPLETED:
      return (
        <Modal isOpen={isOpen}>
          <ModalContent>
            {WalletLogo}
            <Spacer />
            <StyledText>Your transaction succeeded.</StyledText>
            <StyledButton onClick={onDismiss}>Close</StyledButton>
          </ModalContent>
        </Modal>
      );
    case TransactionStatusType.IS_FAILED:
      return (
        <Modal isOpen={isOpen}>
          <ModalContent>
            {WalletLogo}
            <Spacer />
            <StyledText>Your transaction could not be processed.</StyledText>
            <StyledButton onClick={onDismiss}>Close</StyledButton>
          </ModalContent>
        </Modal>
      );
    default:
      return (
        <Modal isOpen={isOpen}>
          <ModalContent>
            {WalletLogo}
            <Spacer />
            <StyledText>Confirm transaction in wallet.</StyledText>
            <StyledButton onClick={onDismiss}>Close</StyledButton>
          </ModalContent>
        </Modal>
      );
  }
};

const StyledText = styled.div`
  font-size: 24px;
  text-align: center;
`;

const StyledButton = styled.button`
  padding: 20px;
  :hover {
    cursor: pointer;
  }
`

export default ConfirmTransactionModal;

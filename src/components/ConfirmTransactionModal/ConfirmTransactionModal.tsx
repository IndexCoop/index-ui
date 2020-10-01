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
      text = <StyledText>Confirm transaction in your wallet.</StyledText>;
      break;
    case TransactionStatusType.IS_PENDING:
      text = <StyledText>Your transaction is processing.</StyledText>;
      break;
    case TransactionStatusType.IS_COMPLETED:
      text = <StyledText>Your transaction succeeded.</StyledText>;
      break;
    case TransactionStatusType.IS_FAILED:
      text = <StyledText>Your transaction could not be processed.</StyledText>;
      break;
    default:
      text = <StyledText>Confirm transaction in wallet.</StyledText>;
      break;
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalContent>
        {WalletLogo}
        <Spacer />
        {text}
      </ModalContent>
    </Modal>
  );
};

const StyledText = styled.div`
  font-size: 24px;
  text-align: center;
`;

export default ConfirmTransactionModal;

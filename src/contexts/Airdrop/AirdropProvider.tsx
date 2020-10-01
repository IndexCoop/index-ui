import React, { useState, useEffect } from "react";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { useCallback } from "react";
import BigNumber from "bignumber.js";

import AirdropContext from "./AirdropContext";
import {
  checkIsAirdropClaimed,
  getAirdropDataForAddress,
} from "../../index-sdk/index";
import ConfirmTransactionModal, {
  TransactionStatusType,
} from "components/ConfirmTransactionModal";
import { claimAirdrop } from "../../index-sdk/airdrop";
import { waitTransaction } from "../../utils/index";

const AirdropProvider: React.FC = ({ children }) => {
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false);
  const [transactionStatusType, setTransactionStatusType] = useState<
    TransactionStatusType | undefined
  >();
  const [airdropQuantity, setAirdropQuantity] = useState<string>();
  const [rewardIndex, setRewardIndex] = useState<number>();
  const [rewardProof, setRewardProof] = useState<string[]>();
  const [isClaimable, setIsClaimable] = useState<boolean>(false);
  const [claimableQuantity, setClaimableQuantity] = useState<BigNumber>();
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  useEffect(() => {
    const initialAirdropReward = getAirdropDataForAddress(account || "");

    if (initialAirdropReward) {
      setAirdropQuantity(initialAirdropReward.amount);
      setRewardIndex(initialAirdropReward.index);
      setRewardProof(initialAirdropReward.proof);
    }
  }, [account]);

  const checkAirdropClaimStatus = useCallback(async () => {
    const isAlreadyClaimed = await checkIsAirdropClaimed(
      ethereum,
      rewardIndex as number
    );
    const claimQuantity = isAlreadyClaimed
      ? new BigNumber("0")
      : new BigNumber(airdropQuantity || "0");

    setIsClaimable(!isAlreadyClaimed);
    setClaimableQuantity(claimQuantity);
  }, [ethereum, rewardIndex, airdropQuantity]);

  useEffect(() => {
    if (!ethereum || !rewardIndex) return;

    checkAirdropClaimStatus();
  }, [ethereum, rewardIndex, checkAirdropClaimStatus]);

  const onClaimAirdrop = useCallback(async () => {
    if (!rewardIndex || !account || !airdropQuantity || !rewardProof) return;

    setConfirmTxModalIsOpen(true);
    setTransactionStatusType(TransactionStatusType.IS_APPROVING);
    const transactionId = await claimAirdrop(
      ethereum,
      account,
      rewardIndex,
      account,
      airdropQuantity,
      rewardProof
    );

    if (!transactionId) {
      setTransactionStatusType(TransactionStatusType.IS_FAILED);
      return;
    }

    setTransactionStatusType(TransactionStatusType.IS_PENDING);
    const success = await waitTransaction(ethereum, transactionId);

    if (success) {
      setTransactionStatusType(TransactionStatusType.IS_COMPLETED);
    } else {
      setTransactionStatusType(TransactionStatusType.IS_FAILED);
    }
  }, [
    ethereum,
    account,
    rewardIndex,
    airdropQuantity,
    rewardProof,
    setConfirmTxModalIsOpen,
  ]);

  return (
    <AirdropContext.Provider
      value={{
        airdropQuantity,
        claimableQuantity,
        rewardIndex,
        rewardProof,
        isClaimable,
        onClaimAirdrop,
      }}
    >
      {children}
      <ConfirmTransactionModal
        isOpen={confirmTxModalIsOpen}
        transactionMiningStatus={transactionStatusType}
        onDismiss={() => setConfirmTxModalIsOpen(false)}
      />
    </AirdropContext.Provider>
  );
};

export default AirdropProvider;

import React, { useState, useEffect } from "react";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { useCallback } from "react";
import BigNumber from "bignumber.js";

import AirdropContext from "./ExternalAirdropContext";
import ConfirmTransactionModal, {
  TransactionStatusType,
} from "components/ConfirmTransactionModal";

import {
  claimAirdrop,
  checkIsAirdropClaimed,
  getAirdropDataForAddress,
} from "index-sdk/index";
import { waitTransaction } from "utils/index";

const AirdropProvider: React.FC = ({ children }) => {
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false);
  const [transactionStatusType, setTransactionStatusType] = useState<
    TransactionStatusType | undefined
  >();
  const [externalAddress, setExternalAddress] = useState<string>();
  const [airdropQuantity, setAirdropQuantity] = useState<string>();
  const [rewardIndex, setRewardIndex] = useState<number>();
  const [rewardProof, setRewardProof] = useState<string[]>();
  const [isClaimable, setIsClaimable] = useState<boolean>(false);
  const [isAlreadyClaimed, setIsAlreadyClaimed] = useState<boolean>(false);
  const [claimableQuantity, setClaimableQuantity] = useState<BigNumber>();
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  const onCheckAirdropClaim = useCallback(async () => {
    setAirdropQuantity(undefined);
    setRewardIndex(undefined);
    setRewardProof(undefined);
    setIsClaimable(false);
    setIsAlreadyClaimed(false);
    setClaimableQuantity(undefined);

    if (!ethereum || !externalAddress) return;

    const initialAirdropReward = getAirdropDataForAddress(
      externalAddress || ""
    );

    if (!initialAirdropReward) {
      return;
    }

    const isAlreadyClaimed = await checkIsAirdropClaimed(
      ethereum,
      initialAirdropReward.index as number
    );

    if (isAlreadyClaimed) {
      setIsAlreadyClaimed(true);
      return;
    }

    const claimQuantity = new BigNumber(initialAirdropReward.amount || "0");

    setAirdropQuantity(initialAirdropReward.amount);
    setRewardIndex(initialAirdropReward.index);
    setRewardProof(initialAirdropReward.proof);
    setIsClaimable(true);
    setClaimableQuantity(claimQuantity);
  }, [ethereum, externalAddress]);

  const onClaimAirdrop = useCallback(async () => {
    if (
      !rewardIndex ||
      !account ||
      !externalAddress ||
      !airdropQuantity ||
      !rewardProof
    )
      return;

    setConfirmTxModalIsOpen(true);
    setTransactionStatusType(TransactionStatusType.IS_APPROVING);
    const transactionId = await claimAirdrop(
      ethereum,
      account,
      rewardIndex,
      externalAddress,
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
    externalAddress,
    rewardIndex,
    airdropQuantity,
    rewardProof,
    setConfirmTxModalIsOpen,
  ]);

  return (
    <AirdropContext.Provider
      value={{
        externalAddress,
        airdropQuantity,
        claimableQuantity,
        rewardIndex,
        rewardProof,
        isClaimable,
        isAlreadyClaimed,
        onUpdateAddress: (val: string) => setExternalAddress(val),
        onCheckAirdropClaim,
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

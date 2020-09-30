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
import ConfirmTransactionModal from "components/ConfirmTransactionModal";
import { claimAirdrop } from "../../index-sdk/airdrop";

const AirdropProvider: React.FC = ({ children }) => {
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false);
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

  const onClaimAirdrop = useCallback(
    async () => {
      if (!rewardIndex || !account || !airdropQuantity || !rewardProof) return;

      setConfirmTxModalIsOpen(true);
      const success = await claimAirdrop(
        ethereum,
        rewardIndex,
        account,
        airdropQuantity,
        rewardProof
      );
      console.log('success is?', success);
      setConfirmTxModalIsOpen(false);
    },
    [ethereum, account, rewardIndex, airdropQuantity, rewardProof, setConfirmTxModalIsOpen]
  );

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
      <ConfirmTransactionModal isOpen={confirmTxModalIsOpen} />
    </AirdropContext.Provider>
  );
};

export default AirdropProvider;

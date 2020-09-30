import React, { useState, useEffect } from "react";
import { useWallet } from "use-wallet";

import AirdropContext from "./AirdropContext";
import { getAirdropDataForAddress } from "../../index-sdk/index";
import { checkIsAirdropClaimed } from "../../utils/index";
import { provider } from "web3-core";
import { useCallback } from "react";
import BigNumber from 'bignumber.js';

const AirdropProvider: React.FC = ({ children }) => {
  const [claimableQuantity, setClaimableQuantity] = useState<string>();
  const [rewardIndex, setRewardIndex] = useState<number>();
  const [rewardProof, setRewardProof] = useState<string[]>();
  const [isClaimed, setIsClaimed] = useState<boolean>();
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  useEffect(() => {
    const initialAirdropReward = getAirdropDataForAddress(account || "");

    if (initialAirdropReward) {
      setClaimableQuantity(new BigNumber(initialAirdropReward.amount).toString());
      setRewardIndex(initialAirdropReward.index);
      setRewardProof(initialAirdropReward.proof);
    }
  }, [account, setClaimableQuantity]);

  const checkAirdropClaimStatus = useCallback(async () => {
    const isAlreadyClaimed = await checkIsAirdropClaimed(ethereum, rewardIndex as number);

    setIsClaimed(isAlreadyClaimed);
  }, [ethereum, rewardIndex]);

  useEffect(() => {
    console.log('using claim effect');
    if (!ethereum || !rewardIndex) return;

    console.log('checking airdrop claim status');

    checkAirdropClaimStatus();
  }, [ethereum, rewardIndex, checkAirdropClaimStatus]);

  return (
    <AirdropContext.Provider
      value={{
        claimableQuantity,
        rewardIndex,
        rewardProof,
        isClaimed,
      }}
    >
      {children}
    </AirdropContext.Provider>
  );
};

export default AirdropProvider;

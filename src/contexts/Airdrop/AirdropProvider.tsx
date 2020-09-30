import React, { useState, useEffect } from "react";
import { useWallet } from "use-wallet";

import AirdropContext from "./AirdropContext";
import { getAirdropDataForAddress } from "../../index-sdk/index";
import { checkIsAirdropClaimed } from "../../utils/index";
import { provider } from "web3-core";
import { useCallback } from "react";
import BigNumber from 'bignumber.js';

const AirdropProvider: React.FC = ({ children }) => {
  const [airdropQuantity, setAirdropQuantity] = useState<string>();
  const [rewardIndex, setRewardIndex] = useState<number>();
  const [rewardProof, setRewardProof] = useState<string[]>();
  const [isClaimable, setIsClaimable] = useState<boolean>(false);
  const [claimableQuantity, setClaimableQuantity] = useState<string>();
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  useEffect(() => {
    const initialAirdropReward = getAirdropDataForAddress(account || "");

    if (initialAirdropReward) {
      setAirdropQuantity(new BigNumber(initialAirdropReward.amount).toString());
      setRewardIndex(initialAirdropReward.index);
      setRewardProof(initialAirdropReward.proof);
    }
  }, [account]);

  const checkAirdropClaimStatus = useCallback(async () => {
    const isAlreadyClaimed = await checkIsAirdropClaimed(ethereum, rewardIndex as number);

    setIsClaimable(!isAlreadyClaimed);
    setClaimableQuantity(isAlreadyClaimed ? '0' : airdropQuantity)
  }, [ethereum, rewardIndex, airdropQuantity]);

  useEffect(() => {
    if (!ethereum || !rewardIndex) return;

    checkAirdropClaimStatus();
  }, [ethereum, rewardIndex, checkAirdropClaimStatus]);

  return (
    <AirdropContext.Provider
      value={{
        airdropQuantity,
        claimableQuantity,
        rewardIndex,
        rewardProof,
        isClaimable,
      }}
    >
      {children}
    </AirdropContext.Provider>
  );
};

export default AirdropProvider;

import React, { useState, useEffect } from 'react'
import { useWallet } from 'use-wallet';

import AirdropContext from './AirdropContext'
import { getAirdropDataForAddress } from '../../index-sdk/index';

const AirdropProvider: React.FC = ({ children }) => {
  const [claimableQuantity, setClaimableQuantity] = useState<string>()
  const [rewardIndex, setRewardIndex] = useState<number>()
  const [rewardProof, setRewardProof] = useState<string[]>()
  const wallet = useWallet();

  useEffect(() => {
    const initialAirdropReward = getAirdropDataForAddress (wallet?.account || '');

    if (initialAirdropReward) {
      setClaimableQuantity(initialAirdropReward.amount)
      setRewardIndex(initialAirdropReward.index)
      setRewardProof(initialAirdropReward.proof)
    }
  }, [wallet, claimableQuantity])

  // const fetchBalances = useCallback(async (userAddress: string, provider: provider) => {
  //   const balances = await Promise.all([
  //     await getBalance(provider, yamV2Address, userAddress),
  //     await getBalance(provider, yamV3Address, userAddress),
  //     await getBalance(provider, yyrcvUniLpAddress, userAddress)
  //   ])
  //   setYamV2Balance(new BigNumber(balances[0]).dividedBy(new BigNumber(10).pow(24)))
  //   setYamV3Balance(new BigNumber(balances[1]).dividedBy(new BigNumber(10).pow(18)))
  //   setYycrvUniLpBalance(new BigNumber(balances[2]).dividedBy(new BigNumber(10).pow(18)))
  // }, [
  //   setYamV2Balance,
  //   setYamV3Balance,
  //   setYycrvUniLpBalance
  // ])

  return (
    <AirdropContext.Provider value={{
      claimableQuantity,
      rewardIndex,
      rewardProof
    }}>
      {children}
    </AirdropContext.Provider>
  )
}

export default AirdropProvider
import rewardsMerkleRoot from './rewardsMerkleRoot.json'

export const getAirdropDataForAddress = (
  address: string
): { index: number; amount: string; proof: string[] } | undefined => {
  const rewardBranch = (rewardsMerkleRoot as any)[address]

  if (!rewardBranch) return

  return rewardBranch
};

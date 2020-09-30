import rewardsMerkleRoot from './rewardsMerkleRoot.json'


export const isAddressInRewardsMerkleRoot = (address: string): boolean => {
  console.log('rewards are', rewardsMerkleRoot);
  return !!(rewardsMerkleRoot as any)[address]
}


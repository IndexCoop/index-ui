import Web3 from 'web3'
import { provider } from 'web3-core'
import { AbiItem } from 'web3-utils'

import AirdropABI from 'constants/abi/Airdrop.json'
import { airdropAddress } from 'constants/tokenAddresses';
import rewardsMerkleRoot from './rewardsMerkleRoot.json'

export const getAirdropContract = (provider: provider, address: string) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(AirdropABI as unknown as AbiItem, address)
  return contract
}

export const getAirdropDataForAddress = (
  address: string
): { index: number; amount: string; proof: string[] } | undefined => {
  const rewardBranch = (rewardsMerkleRoot as any)[address]

  if (!rewardBranch) return

  return rewardBranch
};

export const checkIsAirdropClaimed = async (provider: provider, rewardIndex: number): Promise<boolean> => {
  const airdropContract = getAirdropContract(provider, airdropAddress)

  try {
    const isAlreadyClaimed: boolean = await airdropContract.methods.isClaimed(rewardIndex).call()
    return isAlreadyClaimed
  } catch (e) {
    return true
  }
}

export const claimAirdrop = async (provider: provider, rewardIndex: number, claimerAddress: string, amount: string, proof: string[]): Promise<boolean> => {
  const airdropContract = getAirdropContract(provider, airdropAddress)

  try {
    const claimArgs = [rewardIndex, claimerAddress, amount, proof]
    const claimSuccessful: boolean = await airdropContract.methods.claim(...claimArgs).send()
    console.log('result is?', claimSuccessful);
    return claimSuccessful
  } catch (e) {
    return true
  }
}

import Web3 from 'web3'
import { provider } from 'web3-core'
import { AbiItem } from 'web3-utils'

import MerkleABI from './abi/MerkleDistributor.json'

export const getMerkleContract = (
  provider: provider,
  rewardsAddress: string
) => {
  const web3 = new Web3(provider)
  return new web3.eth.Contract(
    (MerkleABI as unknown) as AbiItem,
    rewardsAddress
  )
}

const getMerkleAccount = (account: string, merkleData: any) => {
  let key = Object.keys(merkleData).find(
    (key) => account?.toLowerCase() === key.toLowerCase()
  )
  if (key === undefined) return undefined
  return (merkleData as any)[key]
}

export const getRewardsDataForAddress = (
  address: string,
  merkleData: any
): { index: number; amount: string; proof: string[] } | undefined => {
  const rewardBranch = getMerkleAccount(address, merkleData)

  if (!rewardBranch) return
  return rewardBranch
}

export const checkIsRewardsClaimed = async (
  provider: provider,
  rewardIndex: number,
  rewardsAddress: any
): Promise<boolean> => {
  const rewardsContract = getMerkleContract(provider, rewardsAddress)

  try {
    const isAlreadyClaimed: boolean = await rewardsContract.methods
      .isClaimed(rewardIndex)
      .call()
    return isAlreadyClaimed
  } catch (e) {
    console.log(e)
    return true
  }
}

export const claimRewards = async (
  provider: provider,
  accountAddress: string,
  rewardIndex: number,
  claimRecipientAddress: string,
  amount: string,
  proof: string[],
  rewardsAddress: string
): Promise<string | null> => {
  const rewardsContract = getMerkleContract(provider, rewardsAddress)
  const claimArgs = [rewardIndex, claimRecipientAddress, amount, proof]

  return new Promise((resolve) => {
    rewardsContract.methods
      .claim(...claimArgs)
      .send({ from: accountAddress, gas: 120000 })
      .on('transactionHash', (txId: string) => {
        if (!txId) resolve(null)

        resolve(txId)
      })
      .on('error', (error: any) => {
        console.log(error)
        resolve(null)
      })
  })
}

import Web3 from 'web3'
import { provider } from 'web3-core'
import { AbiItem } from 'web3-utils'

import AirdropABI from 'index-sdk/abi/Airdrop.json'
import { airdropAddress } from 'constants/ethContractAddresses'
import rewardsMerkleRoot from './rewardsMerkleRoot.json'

export const getAirdropContract = (provider: provider, address: string) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(
    (AirdropABI as unknown) as AbiItem,
    address
  )
  return contract
}

export const getAirdropDataForAddress = (
  address: string
): { index: number; amount: string; proof: string[] } | undefined => {
  const rewardBranch = (rewardsMerkleRoot as any)[address?.toLowerCase()]

  if (!rewardBranch) return

  return rewardBranch
}

export const checkIsAirdropClaimed = async (
  provider: provider,
  rewardIndex: number
): Promise<boolean> => {
  const airdropContract = getAirdropContract(provider, airdropAddress as string)

  try {
    const isAlreadyClaimed: boolean = await airdropContract.methods
      .isClaimed(rewardIndex)
      .call()
    return isAlreadyClaimed
  } catch (e) {
    console.log(e)
    return true
  }
}

export const claimAirdrop = async (
  provider: provider,
  accountAddress: string,
  rewardIndex: number,
  claimRecipientAddress: string,
  amount: string,
  proof: string[]
): Promise<string | null> => {
  const airdropContract = getAirdropContract(provider, airdropAddress as string)
  const claimArgs = [rewardIndex, claimRecipientAddress, amount, proof]

  return new Promise((resolve) => {
    airdropContract.methods
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

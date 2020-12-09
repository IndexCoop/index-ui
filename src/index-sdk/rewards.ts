import Web3 from 'web3'
import MerkleABI from './abi/MerkleDistributor.json'
import merkleData from './novemberRewardsMerkle.json'
import { provider } from 'web3-core'
import { AbiItem } from 'web3-utils'
import BigNumber from 'bignumber.js'

export const getMerkleContract = (provider: provider) => {
  const web3 = new Web3(provider)
  return new web3.eth.Contract(
    (MerkleABI as unknown) as AbiItem,
    '0xaf099b9badc400ea2c07bb21729461889487438e'
  )
}

export const claimRewards = (
  provider: provider,
  account: string
): Promise<string | null> => {
  const merkleContract = getMerkleContract(provider)
  const merkleAccount = (merkleData as any)[account.toLowerCase()]
  return new Promise((resolve) => {
    merkleContract.methods
      .claim(
        merkleAccount.index,
        account.toLowerCase(),
        merkleAccount.amount,
        merkleAccount.proof
      )
      .send({ from: account, gas: 120000 })
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

export const isClaimed = async (provider: provider, account: string) => {
  const merkleContract = getMerkleContract(provider)
  const merkleAccount = (merkleData as any)[account.toLowerCase()]
  try {
    const isAlreadyClaimed: boolean = await merkleContract.methods
      .isClaimed(merkleAccount.index)
      .call()
    return isAlreadyClaimed
  } catch (e) {
    console.log(e)
    return true
  }
}

export const getUnclaimedRewards = async (
  provider: provider,
  account: string
): Promise<BigNumber> => {
  const merkleAccount = (merkleData as any)[account.toLowerCase()]
  if (await isClaimed(provider, account)) {
    return new BigNumber(0)
  } else {
    return new BigNumber(merkleAccount.amount)
  }
}

import Web3 from 'web3'
import { provider } from 'web3-core'
import { AbiItem } from 'web3-utils'

import StakeABI from 'index-sdk/abi/Stake.json'
import { stakingRewardsAddress } from 'constants/ethContractAddresses'
import BigNumber from 'utils/bignumber'

export const getStakingRewardsContract = (provider: provider) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(
    (StakeABI as unknown) as AbiItem,
    stakingRewardsAddress
  )
  return contract
}

export const stakeUniswapEthDpiLpTokens = (
  provider: provider,
  account: string,
  stakeQuantity: BigNumber
): Promise<string | null> => {
  const stakingContract = getStakingRewardsContract(provider)

  return new Promise((resolve) => {
    stakingContract.methods
      .stake(stakeQuantity.toString())
      .send({ from: account, gas: 200000 })
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

export const unstakeUniswapEthDpiLpTokens = (
  provider: provider,
  account: string,
  unstakeQuantity: BigNumber
): Promise<string | null> => {
  const stakingContract = getStakingRewardsContract(provider)

  return new Promise((resolve) => {
    stakingContract.methods
      .withdraw(unstakeQuantity.toString())
      .send({ from: account, gas: 200000 })
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

export const getEarnedIndexTokenQuantity = async (
  provider: provider,
  account: string
): Promise<string> => {
  const stakingContract = getStakingRewardsContract(provider)

  try {
    const earnedTokenQuantity: string = stakingContract.methods
      .earned(account)
      .call()

    return earnedTokenQuantity
  } catch (e) {
    console.log(e)

    return '0'
  }
}

export const claimEarnedIndexLpReward = (
  provider: provider,
  account: string
): Promise<string | null> => {
  const stakingContract = getStakingRewardsContract(provider)

  return new Promise((resolve) => {
    stakingContract.methods
      .getReward()
      .send({ from: account, gas: 200000 })
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

export const unstakeAndClaimEarnedIndexLpReward = (
  provider: provider,
  account: string
): Promise<string | null> => {
  const stakingContract = getStakingRewardsContract(provider)

  return new Promise((resolve) => {
    stakingContract.methods
      .exit()
      .send({ from: account, gas: 250000 })
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

// Currently set for 12pm PST Dec. 6th
export const farmEndTime = '1607284800000'

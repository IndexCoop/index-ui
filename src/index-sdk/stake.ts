import Web3 from 'web3'
import { provider } from 'web3-core'
import { AbiItem } from 'web3-utils'

import StakeABI from 'index-sdk/abi/Stake.json'
import { stakingRewardsAddress } from 'constants/tokenAddresses'
import BigNumber from 'bignumber.js'

export const getStakingRewardsContract = (provider: provider) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(
    (StakeABI as unknown) as AbiItem,
    stakingRewardsAddress
  )
  return contract
}

export const stakeUniswapEthDpiLpTokens = async (
  provider: provider,
  account: string,
  stakeQuantity: BigNumber,
): Promise<string | null> => {
  const stakingContract = getStakingRewardsContract(provider)

  return new Promise((resolve) => {
    stakingContract.methods
      .stake(stakeQuantity)
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

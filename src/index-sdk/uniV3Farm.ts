import Web3 from 'web3'
import { provider } from 'web3-core'
import { AbiItem } from 'web3-utils'

import {
  nftPositionManagerAddress,
  uniswapV3FactoryAddress,
  uniswapV3StakerAddress,
} from 'constants/ethContractAddresses'
import { FarmData, V3Farm } from 'constants/v3Farms'
import nftPositionManagerAbi from 'index-sdk/abi/NftPositionManager.json'
import uniswapV3FactoryAbi from 'index-sdk/abi/uniswapV3Factory.json'
import uniswapV3StakerAbi from 'index-sdk/abi/uniswapV3Staker.json'
import BigNumber from 'utils/bignumber'

/**
 * Returns all NFTs eligible for the target farm for the target user account.
 * These are effectively all unstaked NFT IDs.
 * @param farm - Target farm to check NFTs against
 * @param user - User's ethereum account
 * @param provider - Ethereum network provider
 * @returns - A list of NFT IDs
 */
export async function getValidIds(
  farm: V3Farm,
  user: string,
  provider: provider
): Promise<number[]> {
  const nftPositionManager = getNftPositionManager(provider)
  const factory = getFactory(provider)

  const totalNfts = await nftPositionManager.methods.balanceOf(user).call()

  const validIds: number[] = []
  for (let i = 0; i < totalNfts; i++) {
    const tokenId = await nftPositionManager.methods
      .tokenOfOwnerByIndex(user, i)
      .call()
    // check if this NFT is an LP for a currently active farm
    if (
      await isTokenFromValidPool(tokenId, farm, nftPositionManager, factory)
    ) {
      validIds.push(tokenId)
    }
  }

  return validIds
}

export async function depositAndStake(
  nftId: number,
  farm: V3Farm,
  user: string,
  provider: provider
): Promise<string | null> {
  const nftPositionManager = getNftPositionManager(provider)

  const stakeTokenType = {
    IncentiveKey: {
      rewardToken: 'address',
      pool: 'address',
      startTime: 'uint256',
      endTime: 'uint256',
      refundee: 'address',
    },
  }

  const currentFarmNumber = getMostRecentFarmNumber(farm)

  const data = new Web3(provider).eth.abi.encodeParameters(
    [stakeTokenType],
    [farm.farms[currentFarmNumber]]
  )

  // add initially staked farms in transfer data
  return new Promise((resolve) => {
    nftPositionManager.methods
      .safeTransferFrom(user, uniswapV3StakerAddress, nftId, data)
      .send({ from: user })
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

export async function withdraw(
  nftId: number,
  user: string,
  farm: V3Farm,
  provider: provider
): Promise<string | null> {
  const stakingContract = getStakingContract(provider)

  const stakedFarmIds = await getCurrentStakes(farm, nftId, provider)

  const data: string[] = await Promise.all(
    stakedFarmIds.map(async (farmId) => {
      return stakingContract.methods
        .unstakeToken(farm.farms[farmId], nftId)
        .encodeABI()
    })
  )

  data.push(
    stakingContract.methods.withdrawToken(nftId, user, '0x').encodeABI()
  )

  return new Promise((resolve) => {
    stakingContract.methods
      .multicall(data)
      .send({ from: user })
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

export async function getAccruedRewardsAmount(
  user: string,
  rewardToken: string,
  provider: provider
): Promise<BigNumber> {
  const stakingContract = getStakingContract(provider)
  return await stakingContract.methods.rewards(rewardToken, user).call()
}

export async function getAllPendingRewardsAmount(
  user: string,
  farm: V3Farm,
  provider: provider
): Promise<BigNumber> {
  const stakingContract = getStakingContract(provider)
  const deposits = await getAllDepositedTokens(user, farm, provider)

  const amounts = await Promise.all(
    deposits.map(async (id) => {
      const stakes = await getCurrentStakes(farm, id, provider)

      const amounts = await Promise.all(
        stakes.map(async (farmNumber) => {
          const rewardInfo = await stakingContract.methods
            .getRewardInfo(farm.farms[farmNumber], id)
            .call()

          return new BigNumber(rewardInfo.reward)
        })
      )

      return amounts.reduce((a, b) => {
        return a.plus(b)
      }, new BigNumber(0))
    })
  )

  return amounts.reduce((a, b) => {
    return a.plus(b)
  }, new BigNumber(0))
}

export type FarmReward = {
  farm: number
  rewards: BigNumber
}

export async function getIndividualPendingRewardsAmount(
  user: string,
  farm: V3Farm,
  nftId: number,
  provider: provider
): Promise<BigNumber> {
  const stakingContract = getStakingContract(provider)

  const stakes = await getCurrentStakes(farm, nftId, provider)

  const pendingRewards = await Promise.all(
    stakes.map(async (farmNumber) => {
      const rewardInfo = await stakingContract.methods
        .getRewardInfo(farm.farms[farmNumber], nftId)
        .call()

      return new BigNumber(rewardInfo.reward)
    })
  )

  return pendingRewards.reduce((a, b) => {
    return a.plus(b)
  }, new BigNumber(0))
}

export async function claimAccruedRewards(
  user: string,
  rewardToken: string,
  provider: provider
): Promise<string | null> {
  const stakingContract = getStakingContract(provider)
  return new Promise((resolve) => {
    stakingContract.methods
      .claimReward(rewardToken, user, 0)
      .send({ from: user })
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

export async function getAllDepositedTokens(
  user: string,
  farm: V3Farm,
  provider: provider
): Promise<number[]> {
  const options = {
    fromBlock: 0,
    toBlock: 'latest',
    filter: {
      from: user,
      to: uniswapV3StakerAddress || '',
    },
  }

  const nftPositionManager = getNftPositionManager(provider)
  const stakingContract = getStakingContract(provider)
  const factory = getFactory(provider)

  const tokenIdsPotentialDuplicates = (
    await nftPositionManager.getPastEvents('Transfer', options)
  ).map((event) => event.returnValues['tokenId'])
  const tokenIds = Array.from(new Set(tokenIdsPotentialDuplicates))

  const currentlyDeposited: number[] = []
  for (let i = 0; i < tokenIds.length; i++) {
    const depositInfo = await stakingContract.methods
      .deposits(tokenIds[i])
      .call()
    const isValidPoolToken = await isTokenFromValidPool(
      tokenIds[i],
      farm,
      nftPositionManager,
      factory
    )

    if (
      isValidPoolToken &&
      (depositInfo.tickLower !== '0' || depositInfo.tickUpper !== '0')
    ) {
      currentlyDeposited.push(parseInt(tokenIds[i]))
    }
  }

  return currentlyDeposited
}

// Helper functions

export function getMostRecentFarmNumber(farm: V3Farm): number {
  return farm.farms.length - 1
}

async function getCurrentStakes(
  farm: V3Farm,
  nftId: number,
  provider: provider
): Promise<number[]> {
  const stakingContract = getStakingContract(provider)
  const currentStakes = []

  for (let i = 0; i < farm.farms.length; i++) {
    const incentiveId = deriveIncentiveId(provider, farm.farms[i])
    const stakeInfo = await stakingContract.methods
      .stakes(nftId, incentiveId)
      .call()

    if (stakeInfo.liquidity !== '0') {
      currentStakes.push(i)
    }
  }

  return currentStakes
}

function getNftPositionManager(provider: provider) {
  const web3 = new Web3(provider)

  return new web3.eth.Contract(
    nftPositionManagerAbi as unknown as AbiItem,
    nftPositionManagerAddress
  )
}

function getFactory(provider: provider) {
  const web3 = new Web3(provider)

  return new web3.eth.Contract(
    uniswapV3FactoryAbi as unknown as AbiItem,
    uniswapV3FactoryAddress
  )
}

function getStakingContract(provider: provider) {
  const web3 = new Web3(provider)

  return new web3.eth.Contract(
    uniswapV3StakerAbi as unknown as AbiItem,
    uniswapV3StakerAddress
  )
}

function deriveIncentiveId(provider: provider, farmPlot: FarmData) {
  const stakeTokenType = {
    IncentiveKey: {
      rewardToken: 'address',
      pool: 'address',
      startTime: 'uint256',
      endTime: 'uint256',
      refundee: 'address',
    },
  }

  const data = new Web3(provider).eth.abi.encodeParameters(
    [stakeTokenType],
    [farmPlot]
  )

  return Web3.utils.keccak256(data)
}

async function isTokenFromValidPool(
  tokenId: number,
  farm: V3Farm,
  nftPositionManager: any,
  factory: any
): Promise<boolean> {
  const position = await nftPositionManager.methods.positions(tokenId).call()
  const nftPoolAddress = await factory.methods
    .getPool(position.token0, position.token1, position.fee)
    .call()

  return farm.pool?.toLowerCase() === nftPoolAddress?.toLowerCase()
}

export const getUpcomingFarms = (farm: V3Farm) => {
  return farm.farms.filter((farm: FarmData) => {
    const now = Date.now()
    const formattedStartTime = farm.startTime * 1000

    return now < formattedStartTime
  })
}

export const getActiveFarms = (farm: V3Farm) => {
  return farm.farms.filter((farm: FarmData) => {
    const now = Date.now()
    const formattedStartTime = farm.startTime * 1000
    const formattedEndTime = farm.endTime * 1000

    return now > formattedStartTime && now < formattedEndTime
  })
}

export const getExpiredFarms = (farm: V3Farm) => {
  return farm.farms.filter((farm: FarmData) => {
    const now = Date.now()
    const formattedEndTime = farm.endTime * 1000

    return now > formattedEndTime
  })
}

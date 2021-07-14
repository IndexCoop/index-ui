import Web3 from 'web3'
import { provider } from 'web3-core'
import { AbiItem } from 'web3-utils'
import BigNumber from 'utils/bignumber'

import nftPositionManagerAbi from 'index-sdk/abi/NftPositionManager.json'
import uniswapV3FactoryAbi from 'index-sdk/abi/uniswapV3Factory.json'
import uniswapV3StakerAbi from 'index-sdk/abi/uniswapV3Staker.json'
import {
  nftPositionManagerAddress,
  uniswapV3FactoryAddress,
  uniswapV3StakerAddress,
} from 'constants/ethContractAddresses'
import farms from 'index-sdk/farms.json'

export type FarmName = 'DPI-ETH'

export async function getValidIds(
  farm: FarmName,
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
  farm: FarmName,
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
    [farms[farm].farms[currentFarmNumber]]
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
  farm: FarmName,
  provider: provider
): Promise<string | null> {
  const stakingContract = getStakingContract(provider)

  const stakedFarmIds = await getCurrentStakes(farm, nftId, provider)

  const data: string[] = await Promise.all(
    stakedFarmIds.map(async (farmId) => {
      return stakingContract.methods
        .unstakeToken(farms[farm].farms[farmId], nftId)
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

export async function getPendingRewardsAmount(
  user: string,
  farm: FarmName,
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
            .getRewardInfo(farms[farm].farms[farmNumber], id)
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
  farm: FarmName,
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

function getMostRecentFarmNumber(farm: FarmName): number {
  return farms[farm].farms.length - 1
}

async function getCurrentStakes(
  farm: FarmName,
  nftId: number,
  provider: provider
): Promise<number[]> {
  const stakingContract = getStakingContract(provider)
  const currentStakes = []

  for (let i = 0; i < farms[farm].farms.length; i++) {
    const incentiveId = Web3.utils.keccak256(
      JSON.stringify(farms[farm].farms[i])
    )
    const stakeInfo = await stakingContract.methods
      .stakes(nftId, incentiveId)
      .call()
    if (stakeInfo.liquidity !== 0) {
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

async function isTokenFromValidPool(
  tokenId: number,
  farm: FarmName,
  nftPositionManager: any,
  factory: any
): Promise<boolean> {
  const position = await nftPositionManager.methods.positions(tokenId).call()
  const nftPoolAddress = await factory.methods
    .getPool(position.token0, position.token1, position.fee)
    .call()

  return farms[farm].pool === nftPoolAddress
}

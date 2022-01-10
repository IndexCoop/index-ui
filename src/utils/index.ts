import { Contract, ethers } from 'ethers'
import Web3 from 'web3'
import { provider, TransactionReceipt } from 'web3-core'
import { AbiItem } from 'web3-utils'

import {
  ethTokenAddress,
  wethTokenPolygonAddress,
} from 'constants/ethContractAddresses'
import { ProductToken } from 'constants/productTokens'
import { getProvider } from 'constants/provider'
import ERC20ABI from 'index-sdk/abi/ERC20.json'
import SupplyCapIssuanceABI from 'index-sdk/abi/SupplyCapIssuanceHook.json'
import BigNumber from 'utils/bignumber'

import { MAINNET_CHAIN_DATA, POLYGON_CHAIN_DATA } from './connectors'

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const waitTransaction = async (provider: provider, txHash: string) => {
  const web3 = new Web3(provider)
  let txReceipt: TransactionReceipt | null = null
  while (txReceipt == null) {
    txReceipt = await web3.eth.getTransactionReceipt(txHash)
    await sleep(2000)
  }
  return txReceipt.status
}

export const approve = async (
  userAddress: string,
  spenderAddress: string,
  tokenAddress: string,
  provider: provider,
  onTxHash?: (txHash: string) => void
): Promise<boolean> => {
  try {
    const tokenContract = getERC20Contract(provider, tokenAddress)
    return tokenContract.methods
      .approve(spenderAddress, ethers.constants.MaxUint256)
      .send(
        { from: userAddress, gas: 80000 },
        async (error: any, txHash: string) => {
          if (error) {
            console.log('ERC20 could not be approved', error)
            onTxHash && onTxHash('')
            return false
          }
          if (onTxHash) {
            onTxHash(txHash)
          }
          const status = await waitTransaction(provider, txHash)
          if (!status) {
            console.log('Approval transaction failed.')
            return false
          }
          return true
        }
      )
  } catch (e) {
    return false
  }
}

export const getAllowance = async (
  userAddress: string,
  spenderAddress: string,
  tokenAddress: string,
  provider: provider
): Promise<string> => {
  try {
    const tokenContract = getERC20Contract(provider, tokenAddress)
    const allowance: string = await tokenContract.methods
      .allowance(userAddress, spenderAddress)
      .call()
    return allowance
  } catch (e) {
    return '0'
  }
}

export const getEthBalance = async (
  provider: provider,
  userAddress: string
): Promise<string> => {
  const web3 = new Web3(provider)
  try {
    const balance: string = await web3.eth.getBalance(userAddress)
    return balance
  } catch (e) {
    return '0'
  }
}

export const getBalance = async (
  provider: provider,
  tokenAddress: string,
  userAddress: string
): Promise<string> => {
  const tokenContract = getERC20Contract(provider, tokenAddress)
  try {
    const balance: string = await tokenContract.methods
      .balanceOf(userAddress)
      .call()
    return balance
  } catch (e) {
    return '0'
  }
}

export const getBigNumBalance = async (
  provider: provider,
  tokenAddress: string,
  userAddress: string
): Promise<BigNumber> => {
  const tokenContract = getERC20Contract(provider, tokenAddress)
  try {
    const balance = await tokenContract.methods.balanceOf(userAddress).call()
    return new BigNumber(balance)
  } catch (e) {
    return new BigNumber(0)
  }
}

export const getERC20Contract = (provider: provider, address: string) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(
    ERC20ABI.abi as unknown as AbiItem,
    address
  )
  return contract
}

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18) => {
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed()
}

export const makeEtherscanLink = (
  transactionHash: string,
  chainId: number | undefined
) => {
  if (chainId && chainId === POLYGON_CHAIN_DATA.chainId)
    return `https://polygonscan.com/tx/${transactionHash}`
  return `https://etherscan.io/tx/${transactionHash}`
}

export const makeEtherscanAddressLink = (transactionHash: string) => {
  return `https://etherscan.io/address/${transactionHash}`
}

export const getSupplyCap = async (tokenAddress: string): Promise<string> => {
  const provider = getProvider()
  const tokenContract = await new Contract(
    tokenAddress,
    SupplyCapIssuanceABI,
    provider
  )
  try {
    const cap = await tokenContract.supplyCap()
    return cap.toString()
  } catch (e) {
    return '1'
  }
}

/**
 * returns an undefined safe BigNumber
 * @param number
 * @returns
 */
export const getBigNumber = (number: BigNumber | undefined) => {
  return number ? number : new BigNumber(0)
}

/**
 * Converts a number from Wei to another denomination of Eth
 * @param number
 * @param power
 * @returns
 */
export const fromWei = (number: BigNumber | undefined, power: number = 18) => {
  return getBigNumber(number).dividedBy(new BigNumber(10).pow(power))
}

/**
 * Formats a BigNumber to 2 decimals from Wei
 * @param number
 * @returns
 */
export const displayFromWei = (number: BigNumber | undefined, decimals: number = 2) => {
  return fromWei(number).toFormat(decimals)
}

/**
 * retrieves appropriate addresses for tokens
 * @param token
 * @param chainId
 * @returns
 */
export const getTokenAddress = (chainId: number, token?: ProductToken) => {
  if (token) {
    if (chainId === POLYGON_CHAIN_DATA.chainId) return token.polygonAddress
    return token.address
  } else {
    if (chainId === MAINNET_CHAIN_DATA.chainId) return ethTokenAddress
    return wethTokenPolygonAddress
  }
}

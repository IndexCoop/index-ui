import Web3 from 'web3'
import { provider } from 'web3-core'
import { AbiItem } from 'web3-utils'
import BigNumber from 'utils/bignumber'

import UniswapRouterABI from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'
import { uniswapRouterAddress } from 'constants/ethContractAddresses'

export enum UniswapTradeType {
  SWAP_EXACT_TOKENS_FOR_TOKENS,
  SWAP_EXACT_TOKENS_FOR_ETH,
  SWAP_EXACT_ETH_FOR_TOKENS,
  SWAP_ETH_FOR_EXACT_TOKENS,
}

export type TransactionOptions = {
  from: string
  gas: string
  gasPrice: string
  value?: string | number | BigNumber
}

export const getUniswapRouterContract = (provider: provider) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(
    (UniswapRouterABI.abi as unknown) as AbiItem,
    uniswapRouterAddress
  )
  return contract
}

export const getUniswapTradeTransaction = (
  provider: provider,
  tradeType: UniswapTradeType,
  tradeConfigs: any[],
  txOpts: TransactionOptions
): (() => Promise<string>) => {
  const uniswapInstance = getUniswapRouterContract(provider)

  switch (tradeType) {
    case UniswapTradeType.SWAP_EXACT_ETH_FOR_TOKENS:
      return () =>
        new Promise((resolve, reject) => {
          uniswapInstance.methods
            .swapExactETHForTokens(...tradeConfigs)
            .send(txOpts)
            .on('transactionHash', (txId: string) => {
              if (!txId) reject()

              resolve(txId)
            })
            .on('error', (error: any) => {
              reject(error)
            })
        })
    case UniswapTradeType.SWAP_EXACT_TOKENS_FOR_ETH:
      return () =>
        new Promise((resolve, reject) => {
          uniswapInstance.methods
            .swapExactTokensForETH(...tradeConfigs)
            .send(txOpts)
            .on('transactionHash', (txId: string) => {
              if (!txId) reject()

              resolve(txId)
            })
            .on('error', (error: any) => {
              reject(error)
            })
        })

    case UniswapTradeType.SWAP_EXACT_TOKENS_FOR_TOKENS:
      return () =>
        new Promise((resolve, reject) => {
          uniswapInstance.methods
            .swapExactTokensForTokens(...tradeConfigs)
            .send(txOpts)
            .on('transactionHash', (txId: string) => {
              if (!txId) reject()

              resolve(txId)
            })
            .on('error', (error: any) => {
              reject(error)
            })
        })

    case UniswapTradeType.SWAP_ETH_FOR_EXACT_TOKENS:
      return () =>
        new Promise((resolve, reject) => {
          uniswapInstance.methods
            .swapETHForExactTokens(...tradeConfigs)
            .send(txOpts)
            .on('transactionHash', (txId: string) => {
              if (!txId) reject()

              resolve(txId)
            })
            .on('error', (error: any) => {
              reject(error)
            })
        })
  }
}

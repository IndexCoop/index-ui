import Web3 from 'web3'
import { provider } from 'web3-core'
import { AbiItem } from 'web3-utils'
import BigNumber from 'utils/bignumber'

import ExchangeIssuanceABI from './abi/issuance.json'
import { exchangeIssuanceAddress } from 'constants/ethContractAddresses'

export enum IssuanceTradeType {
  ISSUE_SET_FOR_EXACT_TOKEN,
  ISSUE_SET_FOR_EXACT_ETH,
  ISSUE_EXACT_SET_FROM_TOKEN,
  ISSUE_EXACT_SET_FROM_ETH,
  REDEEM_EXACT_SET_FOR_TOKEN,
  REDEEM_EXACT_SET_FOR_ETH,
}

export type TransactionOptions = {
  from: string
  gas: string
  gasPrice: string
  value?: string | number | BigNumber
}

export const getIssuanceContract = (provider: provider) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(
    (ExchangeIssuanceABI as unknown) as AbiItem,
    exchangeIssuanceAddress
  )
  return contract
}

export const getIssuanceTradeTransaction = (
  provider: provider,
  tradeType: IssuanceTradeType,
  tradeConfigs: any[],
  txOpts: TransactionOptions
): (() => Promise<string>) => {
  const IssuanceInstance = getIssuanceContract(provider)
  console.log(IssuanceInstance, tradeType)

  switch (tradeType) {
    case IssuanceTradeType.ISSUE_SET_FOR_EXACT_TOKEN:
      return () =>
        new Promise((resolve, reject) => {
          IssuanceInstance.methods
            .issueSetForExactToken(...tradeConfigs)
            .send(txOpts)
            .on('transactionHash', (txId: string) => {
              if (!txId) reject()

              resolve(txId)
            })
            .on('error', (error: any) => {
              reject(error)
            })
        })
    case IssuanceTradeType.ISSUE_SET_FOR_EXACT_ETH:
      return () =>
        new Promise((resolve, reject) => {
          IssuanceInstance.methods
            .issueSetForExactETH(...tradeConfigs)
            .send(txOpts)
            .on('transactionHash', (txId: string) => {
              if (!txId) reject()

              resolve(txId)
            })
            .on('error', (error: any) => {
              reject(error)
            })
        })

    case IssuanceTradeType.ISSUE_EXACT_SET_FROM_TOKEN:
      return () =>
        new Promise((resolve, reject) => {
          IssuanceInstance.methods
            .issueExactSetFromToken(...tradeConfigs)
            .send(txOpts)
            .on('transactionHash', (txId: string) => {
              if (!txId) reject()

              resolve(txId)
            })
            .on('error', (error: any) => {
              reject(error)
            })
        })

    case IssuanceTradeType.ISSUE_EXACT_SET_FROM_ETH:
      return () =>
        new Promise((resolve, reject) => {
          IssuanceInstance.methods
            .issueExactSetFromETH(...tradeConfigs)
            .send(txOpts)
            .on('transactionHash', (txId: string) => {
              if (!txId) reject()

              resolve(txId)
            })
            .on('error', (error: any) => {
              reject(error)
            })
        })

    case IssuanceTradeType.REDEEM_EXACT_SET_FOR_TOKEN:
      return () =>
        new Promise((resolve, reject) => {
          IssuanceInstance.methods
            .redeemExactSetForToken(...tradeConfigs)
            .send(txOpts)
            .on('transactionHash', (txId: string) => {
              if (!txId) reject()

              resolve(txId)
            })
            .on('error', (error: any) => {
              reject(error)
            })
        })

    case IssuanceTradeType.REDEEM_EXACT_SET_FOR_ETH:
      return () =>
        new Promise((resolve, reject) => {
          IssuanceInstance.methods
            .redeemExactSetForETH(...tradeConfigs)
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

import Web3 from 'web3'
import { provider } from 'web3-core'
import { AbiItem } from 'web3-utils'
import BigNumber from 'utils/bignumber'

import ExchangeIssuanceABI from './abi/issuance.json'
import {
  exchangeIssuanceAddress,
  dpiTokenAddress,
  cgiTokenAddress,
  indexTokenAddress,
} from 'constants/ethContractAddresses'

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
  gas?: string
  gasPrice: string
  value?: string | number | BigNumber
}

export const getIssuanceContract = (provider: provider) => {
  let web3
  if (provider) web3 = new Web3(provider)
  else web3 = new Web3((window as any).ethereum)
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

export const getIssuanceTradeEstimation = async (
  provider: provider,
  tradeType: IssuanceTradeType,
  tradeConfigs: any[],
  txOpts: TransactionOptions
): Promise<any> => {
  const IssuanceInstance = getIssuanceContract(provider)
  IssuanceInstance.methods
    .WETH()
    .call()
    .then((res: any) => console.log(res))

  switch (tradeType) {
    case IssuanceTradeType.ISSUE_SET_FOR_EXACT_TOKEN:
      return new Promise((resolve, reject) => {
        IssuanceInstance.methods
          .issueSetForExactToken(...tradeConfigs)
          .estimateGas(txOpts)
          .then((res: any) => {
            resolve(res)
          })
          .catch((e: any) => reject(e))
      })
    case IssuanceTradeType.ISSUE_SET_FOR_EXACT_ETH:
      return new Promise((resolve, reject) => {
        console.log(tradeConfigs)
        IssuanceInstance.methods
          .issueSetForExactETH(...tradeConfigs)
          .estimateGas(txOpts)
          .then((res: any) => {
            resolve(res)
          })
          .catch((e: any) => reject(e))
      })

    case IssuanceTradeType.ISSUE_EXACT_SET_FROM_TOKEN:
      return new Promise((resolve, reject) => {
        IssuanceInstance.methods
          .issueExactSetFromToken(...tradeConfigs)
          .estimateGas(txOpts)
          .then((res: any) => {
            resolve(res)
          })
          .catch((e: any) => reject(e))
      })

    case IssuanceTradeType.ISSUE_EXACT_SET_FROM_ETH:
      return new Promise((resolve, reject) => {
        IssuanceInstance.methods
          .issueExactSetFromETH(...tradeConfigs)
          .estimateGas(txOpts)
          .then((res: any) => {
            resolve(res)
          })
          .catch((e: any) => reject(e))
      })

    case IssuanceTradeType.REDEEM_EXACT_SET_FOR_TOKEN:
      return new Promise((resolve, reject) => {
        IssuanceInstance.methods
          .redeemExactSetForToken(...tradeConfigs)
          .estimateGas(txOpts)
          .then((res: any) => {
            resolve(res)
          })
          .catch((e: any) => reject(e))
      })

    case IssuanceTradeType.REDEEM_EXACT_SET_FOR_ETH:
      return new Promise((resolve, reject) => {
        IssuanceInstance.methods
          .redeemExactSetForETH(...tradeConfigs)
          .estimateGas(txOpts)
          .then((res: any) => {
            resolve(res)
          })
          .catch((e: any) => reject(e))
      })
  }
}

export const getIssuanceTradeData = async (
  provider: provider,
  id: string,
  isIssuanceOrder: boolean,
  requestQuantity: BigNumber,
  currencyAddress: string,
  activeField: 'set' | 'currency'
): Promise<any> => {
  const IssuanceInstance = getIssuanceContract(provider)

  let setTokenAddress: string | undefined
  if (id === 'dpi')
    setTokenAddress = '0xa3b8851337C5e2AA733EC9DCAe13F8FD2F694414'
  else if (id === 'cgi') setTokenAddress = cgiTokenAddress
  else if (id === 'index') setTokenAddress = indexTokenAddress

  if (!isIssuanceOrder) {
    return new Promise((resolve, reject) => {
      IssuanceInstance.methods
        .getAmountOutOnRedeemSet(
          setTokenAddress,
          currencyAddress,
          requestQuantity
        )
        .call()
        .then((res: any) => {
          resolve(res)
        })
        .catch((e: any) => reject(e))
    })
  } else if (activeField === 'set') {
    return new Promise((resolve, reject) => {
      IssuanceInstance.methods
        .getAmountInToIssueExactSet(
          setTokenAddress,
          currencyAddress,
          requestQuantity
        )
        .call()
        .then((res: any) => {
          resolve(res)
        })
        .catch((e: any) => reject(e))
    })
  } else {
    console.log(setTokenAddress, currencyAddress, requestQuantity)
    return new Promise((resolve, reject) => {
      IssuanceInstance.methods
        .getEstimatedIssueSetAmount(
          setTokenAddress,
          currencyAddress,
          requestQuantity
        )
        .call()
        .then((res: any) => {
          console.log(res)
          resolve(res)
        })
        .catch((e: any) => reject(e))
    })
  }
}

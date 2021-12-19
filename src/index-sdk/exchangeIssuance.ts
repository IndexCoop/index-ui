import Web3 from 'web3'
import { ethers } from 'ethers'
import { provider } from 'web3-core'
import { AbiItem } from 'web3-utils'
import { ZeroExQuote } from 'utils/zeroExUtils'

import ExchangeIssuanceZeroExABI from 'index-sdk/abi/ExchangeIssuanceZeroEx.json'
import setTokenABI from 'index-sdk/abi/ISetToken.json'
import { exchangeIssuanceZeroExAddress } from 'constants/ethContractAddresses'
import BigNumber from 'utils/bignumber'

export const getExchangeIssuanceZeroEx = (provider: provider) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(
    ExchangeIssuanceZeroExABI as unknown as AbiItem,
    exchangeIssuanceZeroExAddress
  )
  return contract
}

export const getSetTokenContract = (tokenAddress: string, provider: any) => {
  const ethersProvider = new ethers.providers.Web3Provider(provider)
  const contract = new ethers.Contract(
    tokenAddress,
    setTokenABI,
    ethersProvider
  )
  return contract
}

export async function parseQuotes(
  quotes: Record<string, ZeroExQuote>,
  tokenAddress: string,
  provider: provider
) {
  const setToken = getSetTokenContract(tokenAddress, provider)
  console.log('Set token contract', setToken)
  const components = await setToken.getComponents()
  console.log('Components: ', components)
  const parsedQuotes = components.map((component: string) => {
    const quote = quotes[component]
    return {
      sellToken: quote.sellTokenAddress,
      buyToken: quote.buyTokenAddress,
      swapCallData: quote.data,
    }
  })
  return parsedQuotes
}

export function issueExactSetFromToken(
  provider: provider,
  account: string,
  setToken: string,
  inputToken: string,
  amountSetToken: BigNumber,
  maxAmountInputToken: BigNumber,
  componentQuotes: Array<any>
) {
  const exchangeIssuanceContract = getExchangeIssuanceZeroEx(provider)

  return exchangeIssuanceContract.methods
    .issueExactSetFromToken(
      setToken,
      inputToken,
      amountSetToken,
      maxAmountInputToken,
      componentQuotes
    )
    .send({ from: account })
}

export function issueExactSetFromETH(
  provider: provider,
  account: string,
  setToken: string,
  amountSetToken: BigNumber,
  maxAmountInputToken: BigNumber,
  componentQuotes: Array<any>
) {
  const exchangeIssuanceContract = getExchangeIssuanceZeroEx(provider)
  return exchangeIssuanceContract.methods
    .issueExactSetFromETH(
      setToken,
      amountSetToken,
      componentQuotes
    )
    .send({ from: account, value: maxAmountInputToken })
}

import Web3 from 'web3'
import { provider } from 'web3-core'
import { AbiItem } from 'web3-utils'

import ExchangeIssuanceZeroExABI from 'index-sdk/abi/ExchangeIssuanceZeroEx.json'
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

  console.log('args', {
    setToken,
    inputToken,
    amountSetToken,
    maxAmountInputToken,
    componentQuotes,
  })
  return exchangeIssuanceContract.methods
    .issueExactSetFromToken(
      setToken,
      inputToken,
      amountSetToken,
      maxAmountInputToken,
      componentQuotes
    )
    .send({ from: account})
}

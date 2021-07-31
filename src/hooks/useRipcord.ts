import Web3 from 'web3'

import useWallet from 'hooks/useWallet'
import { flexibleLeverageStrategyExtension } from 'constants/ethContractAddresses'
import FlexibleLeverageStrategyABI from 'index-sdk/abi/FlexibleLeverageStrategyExtension.json'
import { AbiItem } from 'web3-eth-abi/node_modules/web3-utils'

export const useRipcord = () => {
  const { ethereum } = useWallet()

  const pullRipcord = async (): Promise<string> => {
    const web3 = new Web3(ethereum)
    const ripcordContract = new web3.eth.Contract(
      FlexibleLeverageStrategyABI as unknown as AbiItem,
      flexibleLeverageStrategyExtension
    )
    try {
      const ripcord: string = await ripcordContract.methods
        .ripcord('UniswapV3ExchangeAdapter')
        .call()
      return ripcord
    } catch (e) {
      return '0'
    }
  }
  return pullRipcord
}

import Web3 from 'web3'

import useWallet from 'hooks/useWallet'
import {
  eth2xflexibleLeverageStrategyExtension,
  btc2xflexibleLeverageStrategyExtension,
} from 'constants/ethContractAddresses'
import FlexibleLeverageStrategyABI from 'index-sdk/abi/FlexibleLeverageStrategyExtension.json'
import { AbiItem } from 'web3-eth-abi/node_modules/web3-utils'

export const useRipcord = (Eth2xOrBtc2x: string) => {
  const { ethereum } = useWallet()

  const flexibleAddress =
    Eth2xOrBtc2x === 'eth2x'
      ? eth2xflexibleLeverageStrategyExtension
      : btc2xflexibleLeverageStrategyExtension

  const pullRipcord = async (): Promise<string> => {
    const web3 = new Web3(ethereum)
    const ripcordContract = new web3.eth.Contract(
      FlexibleLeverageStrategyABI as unknown as AbiItem,
      flexibleAddress
    )
    try {
      const ripcord: string = await ripcordContract.methods
        .ripcord('UniswapV3ExchangeAdapter')
        .call()
      return ripcord
    } catch (e) {
      return 'Could not access the ripcord function'
    }
  }
  return pullRipcord
}

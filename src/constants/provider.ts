import { ethers } from 'ethers'
import Web3 from 'web3'

export const getProvider = () => {
  return new ethers.providers.JsonRpcProvider(
    process.env.REACT_APP_ALCHEMY_API ||
      'https://eth-mainnet.alchemyapi.io/v2/Z3DZk23EsAFNouAbUzuw9Y-TvfW9Bo1S'
  )
}

export const getWeb3ReactProvider = () => {
  return new Web3(
    new Web3.providers.HttpProvider(
      'https://eth-mainnet.alchemyapi.io/v2/Z3DZk23EsAFNouAbUzuw9Y-TvfW9Bo1S'
    )
  )
}

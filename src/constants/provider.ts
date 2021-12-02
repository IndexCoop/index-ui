import { ethers } from 'ethers'

export const getProvider = () => {
  return new ethers.providers.JsonRpcProvider(
    process.env.REACT_APP_ALCHEMY_API ||
      'https://eth-mainnet.alchemyapi.io/v2/Z3DZk23EsAFNouAbUzuw9Y-TvfW9Bo1S'
  )
}

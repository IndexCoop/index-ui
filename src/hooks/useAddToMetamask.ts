import { ProductToken } from 'constants/productTokens'
import useWallet from 'hooks/useWallet'
import { MAINNET_CHAIN_DATA } from 'utils/connectors'

export const useAddToMetamask = () => {
  const wallet = useWallet()

  const addToken = async (token: ProductToken) => {
    const tokenAddress =
      wallet.chainId === MAINNET_CHAIN_DATA.chainId
        ? token.address
        : token.polygonAddress
    await wallet.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: token.symbol,
          decimals: 18,
          image: token.image,
        },
      },
    })
  }

  return addToken
}

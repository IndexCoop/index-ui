import useWallet from 'hooks/useWallet'
import { ProductToken } from 'constants/productTokens'

export const useAddToMetamask = () => {
  const wallet = useWallet()

  const addToken = async (token: ProductToken) => {
    await wallet.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: token.address,
          symbol: token.symbol,
          decimals: 18,
          image: token.image,
        },
      },
    })
  }

  return addToken
}

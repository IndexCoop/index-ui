import useWallet from 'hooks/useWallet'
import { productTokensBySymbol } from 'constants/productTokens'

export const useAddToMetamask = () => {
  const wallet = useWallet()

  const addToken = async (
    symbol: 'DPI' | 'MVI' | 'ETH2x-FLI' | 'CGI' | 'INDEX'
  ) => {
    await wallet.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: productTokensBySymbol[symbol].address,
          symbol: symbol,
          decimals: 18,
          image: productTokensBySymbol[symbol].image,
        },
      },
    })
  }

  return addToken
}

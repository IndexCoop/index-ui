import { UniswapTradeType } from 'uniswap-sdk/uniswap'
import { UniswapPriceData } from './types'

export const getUniswapTradeType = (
  isUserBuying: boolean,
  selectedCurrency: string,
  uniswapData: UniswapPriceData
): UniswapTradeType => {
  if (selectedCurrency !== 'wrapped_eth') {
    return UniswapTradeType.SWAP_EXACT_TOKENS_FOR_TOKENS
  }

  if (isUserBuying && uniswapData.trade_type === 'exact_out') {
    return UniswapTradeType.SWAP_ETH_FOR_EXACT_TOKENS
  }

  if (isUserBuying && uniswapData.trade_type === 'exact_in') {
    return UniswapTradeType.SWAP_EXACT_ETH_FOR_TOKENS
  }

  return UniswapTradeType.SWAP_EXACT_TOKENS_FOR_ETH
}

export const getUniswapCallData = (
  tradeType: UniswapTradeType,
  uniswapData: UniswapPriceData,
  userAddress: string
) => {
  const { amount_in, amount_out, path, deadline } = uniswapData

  switch (tradeType) {
    case UniswapTradeType.SWAP_EXACT_TOKENS_FOR_TOKENS:
    case UniswapTradeType.SWAP_EXACT_TOKENS_FOR_ETH:
      return [amount_in, amount_out, path, userAddress, deadline]

    // When paying with ETH, input amount should be included in msg.value
    case UniswapTradeType.SWAP_EXACT_ETH_FOR_TOKENS:
    case UniswapTradeType.SWAP_ETH_FOR_EXACT_TOKENS:
      return [amount_out, path, userAddress, deadline]

    default:
      return null
  }
}

export const getUniswapTransactionOptions = (
  tradeType: UniswapTradeType,
  uniswapData: UniswapPriceData,
  userAddress: string
) => {
  const { gas_cost, gas_price, amount_in } = uniswapData

  switch (tradeType) {
    case UniswapTradeType.SWAP_EXACT_TOKENS_FOR_TOKENS:
    case UniswapTradeType.SWAP_EXACT_TOKENS_FOR_ETH:
      return {
        from: userAddress,
        gasPrice: gas_price,
        gas: gas_cost,
      }

    // When paying with ETH, input amount should be included in msg.value
    case UniswapTradeType.SWAP_EXACT_ETH_FOR_TOKENS:
    case UniswapTradeType.SWAP_ETH_FOR_EXACT_TOKENS:
      return {
        from: userAddress,
        gasPrice: gas_price,
        gas: gas_cost,
        value: amount_in,
      }

    default:
      return null
  }
}

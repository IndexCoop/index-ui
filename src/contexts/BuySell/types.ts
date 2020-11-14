export type UniswapPriceDisplay = {
  from_quantity: string
  from_token_price_usd: string
  to_quantity: string
  to_token_price_usd: string
  input_value_usd: string
  output_value_usd: string
  gas_price_usd: string
  gas_price_eth: string
  slippage: string
  total_price_usd: string
  total_price_currency: string
}

export type UniswapPriceData = {
  amount_in: string
  amount_out: string
  path: string[]
  deadline: number
  gas_cost: string
  gas_price: string
  display: UniswapPriceDisplay
  trade_type: 'exact_out' | 'exact_in'
}

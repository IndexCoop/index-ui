export type ZeroExData = {
  price: string
  guaranteedPrice: string
  buyTokenAddress: string
  sellTokenAddress: string
  buyAmount: string
  sellAmount: string
  to: string
  from: string
  sources: { name: string; proportion: string }[]
  displayBuyAmount: number
  displaySellAmount: number
  minOutput: number
  maxInput: number
  gas: string | undefined
  gasPrice: string
}

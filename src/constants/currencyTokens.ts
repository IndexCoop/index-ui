import { daiTokenAddress, usdcTokenAddress } from './ethContractAddresses'

export const currencyTokens = [
  {
    name: 'Ether',
    label: 'ETH',
    id: 'wrapped_eth',
    address: undefined,
  },
  {
    name: 'Dai',
    label: 'DAI',
    id: 'mcd',
    address: daiTokenAddress,
  },
  {
    name: 'USD Coin',
    label: 'USDC',
    id: 'usdc',
    address: usdcTokenAddress,
  },
]

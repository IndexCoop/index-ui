import { daiTokenAddress, usdcTokenAddress } from './ethContractAddresses'

export const currencyTokens = [
  {
    name: 'Ether',
    label: 'ETH',
    id: 'wrapped_eth',
    address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
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

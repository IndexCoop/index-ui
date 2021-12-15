import gql from 'graphql-tag'

import { ApolloClient, HttpLink,InMemoryCache } from '@apollo/client'

import {
  uniswapEthDpiLpTokenAddress,
  uniswapEthMviLpTokenAddress,
} from 'constants/ethContractAddresses'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
  }),
  cache: new InMemoryCache(),
})

export const DPI_ETH_UNISWAP_QUERY = gql`
  {
    pairs(where: { id: "${uniswapEthDpiLpTokenAddress}" }) {
      id
      reserveUSD
      totalSupply
    }
  }
`

export const ETH_MVI_UNISWAP_QUERY = gql`
  {
    pairs(where: { id: "${uniswapEthMviLpTokenAddress}" }) {
      id
      reserveUSD
      totalSupply
    }
  }
`

export default client

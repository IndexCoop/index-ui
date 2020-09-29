import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import gql from 'graphql-tag'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
  }),
  cache: new InMemoryCache(),
})

export const DPI_ETH_UNISWAP_QUERY= gql`
  {
    pairs(where: { id: "0x4d5ef58aac27d99935e5b6b4a6778ff292059991" }) {
      id
      reserveUSD
    }
    bundle(id: "1") {
      ethPrice
    }
    tokens(where: { id: "0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b" }) {
      derivedETH
    }
  }
`

export default client

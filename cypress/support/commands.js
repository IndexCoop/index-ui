import { Eip1193Bridge } from '@ethersproject/experimental/lib/eip1193-bridge'
import { JsonRpcProvider } from '@ethersproject/providers'
import { Wallet } from '@ethersproject/wallet'

const jsonRPCProviders = {
  1: 'https://eth-mainnet.alchemyapi.io/v2/EElfXQcZk-acQCjrLv4ERIBBdCBxCY2_',
}

const TEST_PRIVATE_KEY =
  '0xe580410d7c37d26c6ad1a837bbae46bc27f9066a466fb3a66e770523b4666d19'

Cypress.Commands.add(
  'injectWeb3Provider',
  (privateKey = TEST_PRIVATE_KEY, chainId = 1) => {
    cy.on('window:before:load', (win) => {
      if (jsonRPCProviders[chainId] == null) {
        throw new Error(
          `No json rpc provider configured for chain id ${chainId}`
        )
      }
      const provider = new JsonRpcProvider(jsonRPCProviders[chainId], chainId)
      const signer = new Wallet(privateKey, provider)
      win.ethereum = new Eip1193Bridge(signer, provider)
    })
  }
)

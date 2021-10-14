// Largely based on: https://github.com/Uniswap/interface/blob/main/cypress/support/commands.js
import { Eip1193Bridge } from '@ethersproject/experimental/lib/eip1193-bridge'
import { JsonRpcProvider } from '@ethersproject/providers'
import { Wallet } from '@ethersproject/wallet'

const TEST_PRIVATE_KEY =
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
const provider = new JsonRpcProvider()
const signer = new Wallet(TEST_PRIVATE_KEY, provider)
const TEST_ADDRESS_NEVER_USE = signer.address

class MockProvider extends Eip1193Bridge {
  chainId = 1

  async sendAsync(...args) {
    console.log('sendAsync called', ...args)
    return this.send(...args)
  }
  async send(...args) {
    console.log('send called', ...args)
    const isCallbackForm =
      typeof args[0] === 'object' && typeof args[1] === 'function'
    let callback
    let method
    let params
    if (isCallbackForm) {
      callback = args[1]
      method = args[0].method
      params = args[0].params
    } else {
      method = args[0]
      params = args[1]
    }
    if (method === 'eth_requestAccounts' || method === 'eth_accounts') {
      if (isCallbackForm) {
        callback({ result: [TEST_ADDRESS_NEVER_USE] })
      } else {
        return Promise.resolve([TEST_ADDRESS_NEVER_USE])
      }
    }
    if (method === 'eth_chainId') {
      if (isCallbackForm) {
        callback(null, { result: '0x1' })
      } else {
        return Promise.resolve('0x1')
      }
    }
    try {
      const result = await super.send(method, params)
      console.debug('result received', method, params, result)
      if (isCallbackForm) {
        callback(null, { result })
      } else {
        return result
      }
    } catch (error) {
      if (isCallbackForm) {
        callback(error, null)
      } else {
        throw error
      }
    }
  }
}

Cypress.Commands.add('injectWeb3Provider', (isONTO = false) => {
  cy.on('window:before:load', (win) => {
    win.localStorage.clear()
    win.ethereum = new MockProvider(signer, provider)
    if (isONTO) {
      win.ethereum.isONTO = isONTO
    }
  })
})

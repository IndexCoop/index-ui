import Web3ProviderEngine from 'web3-provider-engine'
import HookedWalletSubprovider from 'web3-provider-engine/subproviders/hooked-wallet'

import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { ConnectorUpdate } from '@web3-react/types'

import { createLedgerSubprovider } from './ledgerSubprovider'

const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js')
const CacheSubprovider = require('web3-provider-engine/subproviders/cache')
const FiltersSubprovider = require('web3-provider-engine/subproviders/filters.js')
const NonceSubprovider = require('web3-provider-engine/subproviders/nonce-tracker.js')
const WsSubprovider = require('web3-provider-engine/subproviders/websocket')

export class LedgerConnector extends AbstractConnector {
  private readonly provider: Web3ProviderEngine
  private readonly ledger: HookedWalletSubprovider

  constructor(
    private readonly chainId: number,
    rpcUrl: string,
    wsUrl: string,
    baseDerivationPath: string = "44'/60'/0'/0/0"
  ) {
    super({ supportedChainIds: [chainId] })
    this.provider = new Web3ProviderEngine()
    this.provider.addProvider(new FiltersSubprovider())
    this.provider.addProvider(new NonceSubprovider())
    this.provider.addProvider(new CacheSubprovider())
    const transport = () => TransportWebUSB.create()
    this.ledger = createLedgerSubprovider(transport, {
      networkId: chainId,
      paths: [baseDerivationPath],
    })
    this.provider.addProvider(this.ledger)
    // TODO: standardised ws endpoint?
    // WS is required to retrieve balances
    this.provider.addProvider(new WsSubprovider({ rpcUrl: wsUrl }))
    this.provider.addProvider(new RpcSubprovider({ rpcUrl }))
  }

  async activate(): Promise<ConnectorUpdate<string | number>> {
    // Only start the provider on activation. The engine will start
    // polling the blockchain.
    this.provider.start()
    return { provider: this.provider, chainId: this.chainId }
  }

  async getProvider(): Promise<Web3ProviderEngine> {
    return this.provider
  }

  async getChainId(): Promise<string | number> {
    return this.chainId
  }

  async getAccount(): Promise<string> {
    // getAccounts is a callback. See HookedWalletSubprovider from
    // metamask. We wrap the callback in a promise and return it.
    return new Promise((resolve, reject) => {
      this.ledger.getAccounts((err: Error, res: string[]) => {
        if (err != null) {
          reject(err)
        } else {
          if (!res.length) {
            reject('no accounts found')
          }
          resolve(res[0])
        }
      })
    })
  }

  deactivate(): void {
    this.provider.stop()
  }
}

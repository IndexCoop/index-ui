import { AbstractConnector } from '@web3-react/abstract-connector'
import { ConnectorUpdate } from '@web3-react/types'
import Web3ProviderEngine from 'web3-provider-engine'
import { RPCSubprovider } from '@0x/subproviders'
import { LedgerSubprovider } from './ledgerSubprovider'

export type LedgerConnectorArguments = {
  chainId: number
  url: string
  pollingInterval?: number
  requestTimeoutMs?: number
  baseDerivationPath?: string
}

export class LedgerConnector extends AbstractConnector {
  private readonly chainId: number
  private readonly url: string
  private readonly pollingInterval?: number
  private readonly requestTimeoutMs?: number
  private readonly baseDerivationPath?: string

  private provider?: any

  constructor({
    chainId,
    url,
    pollingInterval,
    requestTimeoutMs,
    baseDerivationPath,
  }: LedgerConnectorArguments) {
    super({ supportedChainIds: [chainId] })
    this.chainId = chainId
    this.url = url
    this.pollingInterval = pollingInterval
    this.requestTimeoutMs = requestTimeoutMs
    this.baseDerivationPath = baseDerivationPath
  }

  async activate(): Promise<ConnectorUpdate<string | number>> {
    if (!this.provider) {
      const engine = new Web3ProviderEngine()
      engine.addProvider(
        new LedgerSubprovider({
          networkId: this.chainId,
          baseDerivationPath: this.baseDerivationPath,
        })
      )
      engine.addProvider(new RPCSubprovider(this.url, this.requestTimeoutMs))
      this.provider = engine
      console.log(engine)
    }
    console.log(this.provider)

    this.provider.start()
    return { provider: this.provider, chainId: this.chainId }
  }

  async getProvider(): Promise<any> {
    return this.provider
  }

  async getChainId(): Promise<string | number> {
    return this.chainId
  }

  async getAccount(): Promise<string> {
    if (!this.provider) {
      await this.activate()
    }
    // Implicitly take the first provider which is the LedgerSubprovider
    // The LedgerSubprovider has function getAccountsAsync()
    const accounts: string[] =
      await this.provider?._providers[0].getAccountsAsync()
    if (accounts.length === 0) {
      throw new Error('No accounts found')
    }
    console.log(accounts)
    return accounts[0]
  }

  deactivate(): void {
    if (this.provider) {
      this.provider.stop()
    }
  }
}

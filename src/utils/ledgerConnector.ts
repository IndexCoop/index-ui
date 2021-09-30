import { Web3ProviderEngine, RPCSubprovider } from '@0x/subproviders'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { ConnectorUpdate } from '@web3-react/types'
import { provider } from 'web3-core'
import { LedgerSubprovider } from './ledgerSubprovider'

export type LedgerConnectorArguments = {
  chainId: number
  url: string
  pollingInterval?: number
  requestTimeoutMs?: number
  baseDerivationPath?: string
}

type Provider = provider & Web3ProviderEngine

export class LedgerConnector extends AbstractConnector {
  private readonly chainId: number
  private readonly url: string
  private readonly pollingInterval?: number
  private readonly requestTimeoutMs?: number
  private readonly baseDerivationPath?: string

  private ledgerProvider?: LedgerSubprovider
  private provider?: Provider

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

  public async activate(): Promise<ConnectorUpdate> {
    if (!this.provider) {
      const engine = new Web3ProviderEngine({
        pollingInterval: this.pollingInterval,
      })
      const ledgerSubprovider = new LedgerSubprovider({
        networkId: this.chainId,
        baseDerivationPath: this.baseDerivationPath,
      })
      this.ledgerProvider = ledgerSubprovider
      engine.addProvider(ledgerSubprovider)
      engine.addProvider(new RPCSubprovider(this.url, this.requestTimeoutMs))
      this.provider = engine
    }

    this.provider.start()

    return { provider: this.provider, chainId: this.chainId }
  }

  public async getProvider(): Promise<provider> {
    if (!this.provider) {
      const update = await this.activate()
      return update.provider
    }
    return this.provider
  }

  public async getChainId(): Promise<number> {
    return this.chainId
  }

  public async getAccount(): Promise<string> {
    if (!this.provider) {
      await this.activate()
    }

    const accounts = await this.ledgerProvider?.getAccountsAsync()
    if (accounts == null || accounts.length === 0) {
      throw new Error('No accounts found')
    }
    return accounts[0]
  }

  deactivate(): void {
    if (this.provider) {
      this.provider.stop()
    }
  }
}

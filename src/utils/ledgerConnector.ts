import { AbstractConnector } from '@web3-react/abstract-connector'
import { ConnectorUpdate } from '@web3-react/types'
import { RPCSubprovider, Web3ProviderEngine } from '@0x/subproviders'
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

  private ledgerProvider?: LedgerSubprovider
  private provider?: Web3ProviderEngine

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

    const account = await this.getAccount()
    return { provider: this.provider, chainId: this.chainId, account }
  }

  public async getProvider(): Promise<Web3ProviderEngine> {
    if (!this.provider) {
      await this.activate()
    }
    return this.provider!!
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

import {
  Web3ProviderEngine,
  LedgerSubprovider,
  RPCSubprovider,
  LedgerEthereumClient,
} from '@0x/subproviders'
import Transport from '@ledgerhq/hw-transport-webusb'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { ConnectorUpdate } from '@web3-react/types'
import { provider } from 'web3-core'
import { LedgerClient } from './ledgerClient'

export type LedgerConnectorArguments = {
  chainId: number
  url: string
  pollingInterval?: number
  requestTimeoutMs?: number
  baseDerivationPath?: string
}

const DEFAULT_DERIVATION_PATH = "44'/60'/0'/0"
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

  public async activate(): Promise<ConnectorUpdate> {
    this.provider = new Web3ProviderEngine({
      pollingInterval: this.pollingInterval,
    })
    const ledgerSubprovider = new LedgerSubprovider({
      networkId: this.chainId,
      ledgerEthereumClientFactoryAsync: () => this._getLedgerEthereumClient(),
      baseDerivationPath: this.baseDerivationPath || DEFAULT_DERIVATION_PATH,
      accountFetchingConfigs: {
        shouldAskForOnDeviceConfirmation: true,
      },
    })
    this.provider.addProvider(ledgerSubprovider)
    this.provider.addProvider(
      new RPCSubprovider(this.url, this.requestTimeoutMs)
    )

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

    const accounts = await this.provider?._providers[0].getAccountsAsync()
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

  private async _getLedgerEthereumClient(): Promise<LedgerEthereumClient> {
    const transport = await Transport.create()
    return new LedgerClient(transport)
  }
}

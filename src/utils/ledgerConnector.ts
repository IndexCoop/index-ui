import {
  Web3ProviderEngine,
  LedgerSubprovider,
  RPCSubprovider,
  LedgerEthereumClient,
  ECSignature,
  ECSignatureString,
  LedgerGetAddressResult,
} from '@0x/subproviders'
import Eth from '@ledgerhq/hw-app-eth'
import Transport from '@ledgerhq/hw-transport'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { ConnectorUpdate } from '@web3-react/types'

export type LedgerConnectorArguments = {
  chainId: number
  url: string
  pollingInterval?: number
  requestTimeoutMs?: number
  baseDerivationPath?: string
}

class LedgerClient implements LedgerEthereumClient {
  transport: Transport

  constructor(transport: Transport) {
    this.transport = transport
  }

  async getAddress(
    derivationPath: string,
    askForDeviceConfirmation: boolean,
    shouldGetChainCode: true
  ): Promise<LedgerGetAddressResult> {
    const eth = new Eth(this.transport)
    const res = await eth.getAddress(
      derivationPath,
      askForDeviceConfirmation,
      shouldGetChainCode
    )
    if (!res.chainCode) {
      throw new Error('No chain code returned')
    }
    return {
      address: res.address,
      publicKey: res.publicKey,
      chainCode: res.chainCode!!,
    }
  }
  async signTransaction(
    derivationPath: string,
    rawTxHex: string
  ): Promise<ECSignatureString> {
    const eth = new Eth(this.transport)
    return eth.signTransaction(derivationPath, rawTxHex)
  }
  async signPersonalMessage(
    derivationPath: string,
    messageHex: string
  ): Promise<ECSignature> {
    const eth = new Eth(this.transport)
    return eth.signPersonalMessage(derivationPath, messageHex)
  }
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
    this.provider.addProvider(
      new LedgerSubprovider({
        networkId: this.chainId,
        ledgerEthereumClientFactoryAsync: async () =>
          new LedgerClient(await TransportWebUSB.create()),
        baseDerivationPath: this.baseDerivationPath || DEFAULT_DERIVATION_PATH,
        accountFetchingConfigs: {
          addressSearchLimit: 1,
          numAddressesToReturn: 1,
          shouldAskForOnDeviceConfirmation: false,
        },
      })
    )
    this.provider.addProvider(
      new RPCSubprovider(this.url, this.requestTimeoutMs)
    )
    this.provider.start()
    return { provider: this.provider, chainId: this.chainId }
  }

  public async getProvider(): Promise<any> {
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
    const provider = await this.getProvider()
    const accounts = await provider._providers[0].getAccountsAsync()
    return accounts[0]
  }

  deactivate(): void {
    if (this.provider) {
      this.provider.stop()
    }
  }
}

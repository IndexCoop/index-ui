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
  private readonly eth: Eth

  constructor(public readonly transport: Transport) {
    this.eth = new Eth(this.transport)
  }

  getAddress = async (
    derivationPath: string,
    askForDeviceConfirmation: boolean,
    shouldGetChainCode: true
  ): Promise<LedgerGetAddressResult> => {
    const res = await this.eth.getAddress(
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

  signTransaction = async (
    derivationPath: string,
    rawTxHex: string
  ): Promise<ECSignatureString> => {
    return this.eth.signTransaction(derivationPath, rawTxHex)
  }

  signPersonalMessage = async (
    derivationPath: string,
    messageHex: string
  ): Promise<ECSignature> => {
    return this.eth.signPersonalMessage(derivationPath, messageHex)
  }
}

const DEFAULT_DERIVATION_PATH = "44'/60'/0'/0"
export class LedgerConnector extends AbstractConnector {
  private readonly chainId: number
  private readonly url: string
  private readonly requestTimeoutMs?: number
  private readonly baseDerivationPath?: string

  private readonly ledger: LedgerSubprovider
  private readonly provider: Web3ProviderEngine

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
    this.requestTimeoutMs = requestTimeoutMs
    this.baseDerivationPath = baseDerivationPath
    this.provider = new Web3ProviderEngine({
      pollingInterval,
    })
    this.ledger = new LedgerSubprovider({
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
    this.provider.addProvider(this.ledger)
    this.provider.addProvider(
      new RPCSubprovider(this.url, this.requestTimeoutMs)
    )
  }

  public async activate(): Promise<ConnectorUpdate> {
    this.provider.start()
    return {
      provider: this.provider,
      chainId: this.chainId,
      account: await this.getAccount(),
    }
  }

  public async getProvider(): Promise<any> {
    return this.provider
  }

  public async getChainId(): Promise<number> {
    return this.chainId
  }

  public async getAccount(): Promise<string> {
    const accounts = await this.ledger.getAccountsAsync()
    return accounts[0]
  }

  deactivate(): void {
    this.provider.stop()
  }
}

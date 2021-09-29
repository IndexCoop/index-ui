import { PartialTxParams } from '@0x/subproviders'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import Eth from '@ledgerhq/hw-app-eth'
import { BaseWalletSubprovider } from '@0x/subproviders/lib/src/subproviders/base_wallet_subprovider'

// First wallet address of ethereum ledger live
const DEFAULT_BASE_DERIVATION_PATH = "44'/60'/0'/0/0"
const ASK_FOR_ON_DEVICE_CONFIRMATION = false
const SHOULD_GET_CHAIN_CODE = false

type LedgerConfig = {
  networkId: number
  baseDerivationPath?: string
  shouldAskForConfirmation?: boolean
}

export class LedgerSubprovider extends BaseWalletSubprovider {
  private readonly networkId: number
  private readonly baseDerivationPath: string
  private readonly shouldAskForConfirmation: boolean

  private eth?: Eth

  constructor({
    networkId,
    baseDerivationPath,
    shouldAskForConfirmation,
  }: LedgerConfig) {
    super()
    this.networkId = networkId
    this.baseDerivationPath = baseDerivationPath || DEFAULT_BASE_DERIVATION_PATH
    this.shouldAskForConfirmation =
      shouldAskForConfirmation || ASK_FOR_ON_DEVICE_CONFIRMATION
  }

  async getAccountsAsync(): Promise<string[]> {
    this.eth = await this._getEthClient()
    if (!this.eth) {
      throw new Error('No client available')
    }

    try {
      const response = await this.eth.getAddress(
        this.baseDerivationPath,
        this.shouldAskForConfirmation,
        SHOULD_GET_CHAIN_CODE
      )
      return [response.address]
    } finally {
      this._destroyEthClient()
    }
  }

  async signTransactionAsync(txParams: PartialTxParams): Promise<string> {
    // TODO: (Richard) to implement
    // Convert txParams to raw transaction and sign using provider.
    throw new Error('Method not implemented.')
  }

  async signPersonalMessageAsync(
    data: string,
    address: string
  ): Promise<string> {
    // TODO: (Richard) to implement
    throw new Error('Method not implemented.')
  }
  async signTypedDataAsync(address: string, typedData: any): Promise<string> {
    // TODO: (Richard) to implement
    throw new Error('Method not implemented.')
  }

  async stop() {
    await this._destroyEthClient()
  }

  async _getEthClient(): Promise<Eth> {
    if (!this.eth) {
      const transport = await TransportWebUSB.create()
      this.eth = new Eth(transport)
    }
    return this.eth
  }

  async _destroyEthClient(): Promise<void> {
    if (this.eth) {
      this.eth.transport.close()
      this.eth = undefined
    }
  }
}

import {
  Callback,
  ErrorCallback,
  JSONRPCRequestPayload,
  PartialTxParams,
  Subprovider,
  JSONRPCResponsePayload,
} from '@0x/subproviders'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import Eth from '@ledgerhq/hw-app-eth'

// First wallet address of ethereum ledger live
const DEFAULT_BASE_DERIVATION_PATH = "44'/60'/0'/0/0"
const ASK_FOR_ON_DEVICE_CONFIRMATION = false
const SHOULD_GET_CHAIN_CODE = false

type LedgerConfig = {
  networkId: number
  baseDerivationPath?: string
  shouldAskForConfirmation?: boolean
}

export class LedgerSubprovider extends Subprovider {
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
    console.log('Retrieving accounts')
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

  async handleRequest(
    payload: JSONRPCRequestPayload,
    next: Callback,
    end: ErrorCallback
  ): Promise<void> {
    let accounts
    let txParams
    let address
    let typedData
    switch (payload.method) {
      case 'eth_chainId':
        end(null, this.networkId)
        return
      case 'eth_coinbase':
        try {
          accounts = await this.getAccountsAsync()
          end(null, accounts[0])
        } catch (e) {
          end(e as Error)
        }
        return
      case 'eth_requestAccounts':
      case 'eth_accounts':
        try {
          accounts = await this.getAccountsAsync()
          end(null, accounts)
        } catch (e) {
          end(e as Error)
        }
        return
      case 'eth_sendTransaction':
        txParams = payload.params[0]
        try {
          // BaseWalletSubprovider._validateSender(txParams.from);
          const filledParams = await this._populateMissingTxParamsAsync(
            txParams
          )
          const signedTx = await this.signTransactionAsync(filledParams)
          const response = await this._emitSendTransactionAsync(signedTx)
          end(null, response.result)
        } catch (err) {
          end(err as Error)
        }
        return
      case 'eth_signTransaction':
        txParams = payload.params[0]
        try {
          const filledParams = await this._populateMissingTxParamsAsync(
            txParams
          )
          const signedTx = await this.signTransactionAsync(filledParams)
          const result = {
            raw: signedTx,
            tx: txParams,
          }
          end(null, result)
        } catch (err) {
          end(err as Error)
        }
        return
      case 'eth_sign':
      case 'personal_sign':
        const data =
          payload.method === 'eth_sign' ? payload.params[1] : payload.params[0]
        address =
          payload.method === 'eth_sign' ? payload.params[0] : payload.params[1]
        try {
          const ecSignatureHex = await this.signPersonalMessageAsync(
            data,
            address
          )
          end(null, ecSignatureHex)
        } catch (err) {
          end(err as Error)
        }
        return
      case 'eth_signTypedData':
        ;[address, typedData] = payload.params
        try {
          const signature = await this.signTypedDataAsync(address, typedData)
          end(null, signature)
        } catch (err) {
          end(err as Error)
        }
        return
      default:
        next()
        return
    }
  }
  private async _emitSendTransactionAsync(
    signedTx: string
  ): Promise<JSONRPCResponsePayload> {
    const payload = {
      method: 'eth_sendRawTransaction',
      params: [signedTx],
    }
    const result = await this.emitPayloadAsync(payload)
    return result
  }
  private async _populateMissingTxParamsAsync(
    partialTxParams: PartialTxParams
  ): Promise<PartialTxParams> {
    let txParams = partialTxParams
    if (partialTxParams.gasPrice === undefined) {
      const gasPriceResult = await this.emitPayloadAsync({
        method: 'eth_gasPrice',
        params: [],
      })
      const gasPrice = gasPriceResult.result.toString()
      txParams = { ...txParams, gasPrice }
    }
    if (partialTxParams.nonce === undefined) {
      const nonceResult = await this.emitPayloadAsync({
        method: 'eth_getTransactionCount',
        params: [partialTxParams.from, 'pending'],
      })
      const nonce = nonceResult.result
      txParams = { ...txParams, nonce }
    }
    if (partialTxParams.gas === undefined) {
      const gasResult = await this.emitPayloadAsync({
        method: 'eth_estimateGas',
        params: [partialTxParams],
      })
      const gas = gasResult.result.toString()
      txParams = { ...txParams, gas }
    }
    return txParams
  }
}

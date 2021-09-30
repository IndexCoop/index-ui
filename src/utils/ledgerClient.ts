import {
  ECSignature,
  ECSignatureString,
  LedgerCommunicationClient,
  LedgerEthereumClient,
  LedgerGetAddressResult,
} from '@0x/subproviders'
import Transport from '@ledgerhq/hw-transport'
import Eth from '@ledgerhq/hw-app-eth'

export class LedgerClient implements LedgerEthereumClient {
  private readonly eth: Eth

  transport: LedgerCommunicationClient

  constructor(transport: Transport) {
    this.eth = new Eth(transport)
    this.transport = transport
  }

  async getAddress(
    derivationPath: string,
    askForDeviceConfirmation: boolean,
    shouldGetChainCode: true
  ): Promise<LedgerGetAddressResult> {
    const response = await this.eth.getAddress(
      derivationPath,
      askForDeviceConfirmation,
      shouldGetChainCode
    )
    if (!response.chainCode) {
      throw new Error('Chain code required')
    }
    return {
      address: response.address,
      publicKey: response.publicKey,
      chainCode: response.chainCode,
    }
  }

  async signTransaction(
    derivationPath: string,
    rawTxHex: string
  ): Promise<ECSignatureString> {
    return this.eth.signTransaction(derivationPath, rawTxHex)
  }

  async signPersonalMessage(
    derivationPath: string,
    messageHex: string
  ): Promise<ECSignature> {
    return this.eth.signPersonalMessage(derivationPath, messageHex)
  }
}

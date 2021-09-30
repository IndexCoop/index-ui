import {
  ECSignature,
  ECSignatureString,
  LedgerCommunicationClient,
  LedgerEthereumClient,
  LedgerGetAddressResult,
} from '@0x/subproviders'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import Eth from '@ledgerhq/hw-app-eth'

export class LedgerClient implements LedgerEthereumClient {
  constructor(transport: TransportWebUSB) {
    this.transport = transport
  }

  async getAddress(
    derivationPath: string,
    askForDeviceConfirmation: boolean,
    shouldGetChainCode: true
  ): Promise<LedgerGetAddressResult> {
    throw new Error('Not implemented')
  }

  async signTransaction(
    derivationPath: string,
    rawTxHex: string
  ): Promise<ECSignatureString> {
    throw new Error('Not yet implemented')
  }

  async signPersonalMessage(
    derivationPath: string,
    messageHex: string
  ): Promise<ECSignature> {
    throw new Error('Not yet implemted')
  }
}

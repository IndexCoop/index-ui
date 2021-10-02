declare module 'web3-provider-engine/subproviders/hooked-wallet' {
  export default HookedWalletSubprovider
  export function HookedWalletSubprovider(opts: any): void
  export class HookedWalletSubprovider {
    constructor(opts: any)
    nonceLock: any
    getAccounts: any
    processTransaction: any
    processMessage: any
    processPersonalMessage: any
    processTypedMessage: any
    approveTransaction: any
    approveMessage: any
    approvePersonalMessage: any
    approveDecryptMessage: any
    approveEncryptionPublicKey: any
    approveTypedMessage: any
    signTransaction: any
    signMessage: any
    signPersonalMessage: any
    decryptMessage: any
    encryptionPublicKey: any
    signTypedMessage: any
    recoverPersonalSignature: any
    publishTransaction: any
    estimateGas: any
    getGasPrice: any
    handleRequest(payload: any, next: any, end: any): void
    _parityRequests: {}
    _parityRequestCount: number
    processSignTransaction(txParams: any, cb: any): void
    processDecryptMessage(msgParams: any, cb: any): void
    processEncryptionPublicKey(msgParams: any, cb: any): void
    autoApprove(txParams: any, cb: any): void
    checkApproval(type: any, didApprove: any, cb: any): void
    parityPostTransaction(txParams: any, cb: any): void
    parityPostSign(address: any, message: any, cb: any): void
    parityCheckRequest(reqId: any, cb: any): any
    validateTransaction(txParams: any, cb: any): any
    validateMessage(msgParams: any, cb: any): any
    validatePersonalMessage(msgParams: any, cb: any): any
    validateDecryptMessage(msgParams: any, cb: any): any
    validateEncryptionPublicKey(address: any, cb: any): void
    validateTypedMessage(msgParams: any, cb: any): any
    validateSender(senderAddress: any, cb: any): any
    finalizeAndSubmitTx(txParams: any, cb: any): void
    finalizeTx(txParams: any, cb: any): void
    fillInTxExtras(txParams: any, cb: any): void
  }
}

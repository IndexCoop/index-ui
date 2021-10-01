import AppEth from '@ledgerhq/hw-app-eth'
import Transport from '@ledgerhq/hw-transport'
import HookedWalletSubprovider from 'web3-provider-engine/subproviders/hooked-wallet'
import { Transaction as EthereumTx } from 'ethereumjs-tx'

const stripHexPrefix = (str: string) =>
  str.slice(0, 2) === '0x' ? str.slice(2) : str

const makeError = (msg: string, id: string) => {
  const err = new Error(msg)
  // @ts-ignore
  err.id = id
  return err
}

interface SubproviderOptions {
  // refer to https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md
  networkId: number
  // derivation path schemes (with a x in the path)
  paths?: string[]
  // should use actively validate on the device
  askConfirm?: boolean
  // number of accounts to derivate
  accountsLength?: number
  // offset index to use to start derivating the accounts
  accountsOffset?: number
}

const defaultOptions = {
  networkId: 1, // mainnet
  paths: ["44'/60'/x'/0/0", "44'/60'/0'/x"], // ledger live derivation path
  askConfirm: false,
  accountsLength: 1,
  accountsOffset: 0,
}

export function createLedgerSubprovider(
  getTransport: () => Promise<Transport>,
  options?: SubproviderOptions
): HookedWalletSubprovider {
  if (options && 'path' in options) {
    throw new Error(
      "path options was replaced by paths. example: paths: [\"44'/60'/x'/0/0\"]"
    )
  }
  const { networkId, paths, askConfirm, accountsLength, accountsOffset } = {
    ...defaultOptions,
    ...options,
  }

  if (!paths.length) {
    throw new Error('paths must not be empty')
  }

  type StringMap = { [key: string]: string }

  const addressToPathMap: StringMap = {}

  const getAccounts = async () => {
    const transport = await getTransport()
    try {
      const eth = new AppEth(transport)
      const addresses: StringMap = {}
      for (let i = accountsOffset; i < accountsOffset + accountsLength; i++) {
        const x = Math.floor(i / paths.length)
        const pathIndex = i - paths.length * x
        const path = paths[pathIndex].replace('x', String(x))
        const response = await eth.getAddress(path, askConfirm, true)
        addresses[path] = response.address
        addressToPathMap[response.address.toLowerCase()] = path
      }
      return addresses
    } finally {
      transport.close()
    }
  }

  type TxParams = { from: string; data: string }

  const signPersonalMessage = async (msgData: TxParams) => {
    const path = addressToPathMap[msgData.from.toLowerCase()]
    if (!path) throw new Error("address unknown '" + msgData.from + "'")
    const transport = await getTransport()
    try {
      const eth = new AppEth(transport)
      const result = await eth.signPersonalMessage(
        path,
        stripHexPrefix(msgData.data)
      )
      const v = parseInt(result.v.toString(), 10) - 27
      let vHex = v.toString(16)
      if (vHex.length < 2) {
        vHex = `0${v}`
      }
      return `0x${result.r}${result.s}${vHex}`
    } finally {
      transport.close()
    }
  }

  const signTransaction = async (txData: TxParams) => {
    const path = addressToPathMap[txData.from.toLowerCase()]
    if (!path) throw new Error("address unknown '" + txData.from + "'")
    const transport = await getTransport()
    try {
      const eth = new AppEth(transport)
      const tx = new EthereumTx(txData, { chain: networkId })

      // Set the EIP155 bits
      tx.raw[6] = Buffer.from([networkId]) // v
      tx.raw[7] = Buffer.from([]) // r
      tx.raw[8] = Buffer.from([]) // s

      // Pass hex-rlp to ledger for signing
      const result = await eth.signTransaction(
        path,
        tx.serialize().toString('hex')
      )

      // Store signature in transaction
      tx.v = Buffer.from(result.v, 'hex')
      tx.r = Buffer.from(result.r, 'hex')
      tx.s = Buffer.from(result.s, 'hex')

      // EIP155: v should be chain_id * 2 + {35, 36}
      const signedChainId = Math.floor((tx.v[0] - 35) / 2)
      const validChainId = networkId & 0xff // FIXME this is to fixed a current workaround that app don't support > 0xff
      if (signedChainId !== validChainId) {
        throw makeError(
          'Invalid networkId signature returned. Expected: ' +
            networkId +
            ', Got: ' +
            signedChainId,
          'InvalidNetworkId'
        )
      }

      return `0x${tx.serialize().toString('hex')}`
    } finally {
      transport.close()
    }
  }

  type Callback = (error?: Error, result?: any) => any

  const subprovider = new HookedWalletSubprovider({
    getAccounts: (callback: Callback) => {
      getAccounts()
        .then((res) => callback(undefined, Object.values(res)))
        .catch((err) => callback(err, null))
    },
    signPersonalMessage: (txData: TxParams, callback: Callback) => {
      signPersonalMessage(txData)
        .then((res) => callback(undefined, res))
        .catch((err) => callback(err, null))
    },
    signTransaction: (txData: TxParams, callback: Callback) => {
      signTransaction(txData)
        .then((res) => callback(undefined, res))
        .catch((err) => callback(err, null))
    },
  })

  return subprovider
}

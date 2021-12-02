import Set from 'set.js'
import { SetDetails, StreamingFeeInfo } from 'set.js/dist/types/src/types'
import { JsonRpcProvider } from '@ethersproject/providers'

import {
  basicIssuanceModuleAddress,
  controllerAddress,
  debtIssuanceModuleAddress,
  debtIssuanceModuleV2Address,
  navIssuanceModuleAddress,
  protocolViewerAddress,
  streamingFeeModuleAddress,
  setTokenCreatorAddress,
  tradeModuleAddress,
  masterOracleAddress,
  governanceModuleAddress,
} from 'constants/ethContractAddresses'
import { provider } from 'web3-core'

export async function getTokenSupply(
  ethersProvider: any,
  productAddresses: string[]
): Promise<SetDetails[]> {
  console.log('getTotalSupply', ethersProvider, productAddresses)
  if (
    basicIssuanceModuleAddress === undefined ||
    streamingFeeModuleAddress === undefined ||
    tradeModuleAddress === undefined ||
    debtIssuanceModuleAddress === undefined ||
    debtIssuanceModuleV2Address === undefined
  ) {
    throw new Error(
      'A set JS module address is not defined. Please check your .env file'
    )
  }

  const set = getSet(ethersProvider)
  console.log(set.setToken, ethersProvider)
  const moduleAddresses = [
    basicIssuanceModuleAddress,
    streamingFeeModuleAddress,
    tradeModuleAddress,
    debtIssuanceModuleAddress,
  ]
  console.log('does it make it here?')
  return await set.setToken.batchFetchSetDetailsAsync(
    productAddresses,
    moduleAddresses
  )
}

export async function getStreamingFees(
  ethersProvider: any,
  productAddresses: string[]
): Promise<StreamingFeeInfo[]> {
  const set = getSet(ethersProvider)
  return set.fees.batchFetchStreamingFeeInfoAsync(productAddresses)
}

export async function getSetDetails(
  ethersProvider: any,
  productAddresses: string[]
): Promise<SetDetails[]> {
  if (
    basicIssuanceModuleAddress === undefined ||
    streamingFeeModuleAddress === undefined ||
    tradeModuleAddress === undefined ||
    debtIssuanceModuleAddress === undefined ||
    debtIssuanceModuleV2Address === undefined
  ) {
    throw new Error(
      'A set JS module address is not defined. Please check your .env file'
    )
  }

  const set = getSet(ethersProvider)
  const moduleAddresses = [
    basicIssuanceModuleAddress,
    streamingFeeModuleAddress,
    tradeModuleAddress,
    debtIssuanceModuleAddress,
    debtIssuanceModuleV2Address,
  ]

  return set.setToken.batchFetchSetDetailsAsync(
    productAddresses,
    moduleAddresses
  )
}

function getSet(ethersProvider: any): Set {
  if (
    basicIssuanceModuleAddress === undefined ||
    controllerAddress === undefined ||
    masterOracleAddress === undefined ||
    navIssuanceModuleAddress === undefined ||
    protocolViewerAddress === undefined ||
    setTokenCreatorAddress === undefined ||
    streamingFeeModuleAddress === undefined ||
    tradeModuleAddress === undefined ||
    governanceModuleAddress === undefined ||
    debtIssuanceModuleAddress === undefined ||
    debtIssuanceModuleV2Address === undefined
  ) {
    throw new Error(
      'A set JS address is not defined. Please check your .env file'
    )
  }

  return new Set({
    ethersProvider: ethersProvider,
    basicIssuanceModuleAddress: basicIssuanceModuleAddress,
    controllerAddress: controllerAddress,
    masterOracleAddress: masterOracleAddress,
    navIssuanceModuleAddress: navIssuanceModuleAddress,
    protocolViewerAddress: protocolViewerAddress,
    setTokenCreatorAddress: setTokenCreatorAddress,
    streamingFeeModuleAddress: streamingFeeModuleAddress,
    tradeModuleAddress: tradeModuleAddress,
    governanceModuleAddress: governanceModuleAddress,
    debtIssuanceModuleAddress: debtIssuanceModuleAddress,
    debtIssuanceModuleV2Address: debtIssuanceModuleAddress,
  })
}

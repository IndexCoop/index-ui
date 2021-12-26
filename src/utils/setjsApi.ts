import Set from 'set.js'
import { SetDetails, StreamingFeeInfo } from 'set.js/dist/types/src/types'

import { JsonRpcProvider } from '@ethersproject/providers'

import {
  basicIssuanceModuleAddress,
  basicIssuanceModulePolygonAddress,
  controllerAddress,
  debtIssuanceModuleAddress,
  debtIssuanceModuleV2Address,
  debtIssuanceModuleV2PolygonAddress,
  governanceModuleAddress,
  masterOracleAddress,
  navIssuanceModuleAddress,
  protocolViewerAddress,
  protocolViewerPolygonAddress,
  setTokenCreatorAddress,
  streamingFeeModuleAddress,
  streamingFeeModulePolygonAddress,
  tradeModuleAddress,
  tradeModulePolygonAddress,
} from 'constants/ethContractAddresses'

import { MAINNET_CHAIN_DATA, POLYGON_CHAIN_DATA } from './connectors'

export async function getTokenSupply(
  ethersProvider: any,
  productAddresses: string[],
  chainId: number
): Promise<SetDetails[]> {
  if (
    basicIssuanceModuleAddress === undefined ||
    basicIssuanceModulePolygonAddress === undefined ||
    streamingFeeModuleAddress === undefined ||
    streamingFeeModulePolygonAddress === undefined ||
    tradeModuleAddress === undefined ||
    tradeModulePolygonAddress === undefined ||
    debtIssuanceModuleAddress === undefined ||
    debtIssuanceModuleV2Address === undefined ||
    debtIssuanceModuleV2PolygonAddress === undefined
  ) {
    throw new Error(
      'A set JS module address is not defined. Please check your .env file'
    )
  }

  const set = getSet(ethersProvider, chainId)
  let moduleAddresses
  if (chainId === MAINNET_CHAIN_DATA.chainId) {
    moduleAddresses = [
      basicIssuanceModuleAddress,
      streamingFeeModuleAddress,
      tradeModuleAddress,
      debtIssuanceModuleAddress,
    ]
  } else {
    moduleAddresses = [
      basicIssuanceModulePolygonAddress,
      streamingFeeModulePolygonAddress,
      tradeModulePolygonAddress,
      debtIssuanceModuleV2PolygonAddress,
    ]
  }
  return await set.setToken.batchFetchSetDetailsAsync(
    productAddresses,
    moduleAddresses
  )
}

export async function getStreamingFees(
  ethersProvider: any,
  productAddresses: string[],
  chainId: number
): Promise<StreamingFeeInfo[]> {
  const set = getSet(ethersProvider, chainId)
  return set.fees.batchFetchStreamingFeeInfoAsync(productAddresses)
}

export async function getSetDetails(
  ethersProvider: any,
  productAddresses: string[],
  chainId: number
): Promise<SetDetails[]> {
  if (
    basicIssuanceModuleAddress === undefined ||
    basicIssuanceModulePolygonAddress === undefined ||
    streamingFeeModuleAddress === undefined ||
    streamingFeeModulePolygonAddress === undefined ||
    tradeModuleAddress === undefined ||
    tradeModulePolygonAddress === undefined ||
    debtIssuanceModuleAddress === undefined ||
    debtIssuanceModuleV2Address === undefined ||
    debtIssuanceModuleV2PolygonAddress === undefined
  ) {
    throw new Error(
      'A set JS module address is not defined. Please check your .env file'
    )
  }

  const set = getSet(ethersProvider, chainId)
  let moduleAddresses: string[] = []
  if (chainId === MAINNET_CHAIN_DATA.chainId) {
    moduleAddresses = [
      basicIssuanceModuleAddress,
      streamingFeeModuleAddress,
      tradeModuleAddress,
      debtIssuanceModuleAddress,
      debtIssuanceModuleV2Address,
    ]
  } else if (chainId === POLYGON_CHAIN_DATA.chainId) {
    moduleAddresses = [
      basicIssuanceModulePolygonAddress,
      streamingFeeModulePolygonAddress,
      tradeModulePolygonAddress,
      debtIssuanceModuleV2PolygonAddress,
    ]
  }
  return set.setToken.batchFetchSetDetailsAsync(
    productAddresses,
    moduleAddresses
  )
}

function getSet(ethersProvider: any, chainId: number): Set {
  if (
    !chainId ||
    basicIssuanceModuleAddress === undefined ||
    basicIssuanceModulePolygonAddress === undefined ||
    controllerAddress === undefined ||
    masterOracleAddress === undefined ||
    navIssuanceModuleAddress === undefined ||
    protocolViewerAddress === undefined ||
    protocolViewerPolygonAddress === undefined ||
    setTokenCreatorAddress === undefined ||
    streamingFeeModuleAddress === undefined ||
    streamingFeeModulePolygonAddress === undefined ||
    tradeModuleAddress === undefined ||
    tradeModulePolygonAddress === undefined ||
    governanceModuleAddress === undefined ||
    debtIssuanceModuleAddress === undefined ||
    debtIssuanceModuleV2Address === undefined ||
    debtIssuanceModuleV2PolygonAddress === undefined
  ) {
    throw new Error(
      'A set JS address is not defined. Please check your .env file'
    )
  }
  if (chainId === POLYGON_CHAIN_DATA.chainId) {
    return new Set({
      web3Provider: ethersProvider,
      basicIssuanceModuleAddress: basicIssuanceModulePolygonAddress,
      controllerAddress: controllerAddress,
      masterOracleAddress: masterOracleAddress,
      navIssuanceModuleAddress: navIssuanceModuleAddress,
      protocolViewerAddress: protocolViewerPolygonAddress,
      setTokenCreatorAddress: setTokenCreatorAddress,
      streamingFeeModuleAddress: streamingFeeModulePolygonAddress,
      tradeModuleAddress: tradeModulePolygonAddress,
      governanceModuleAddress: governanceModuleAddress,
      debtIssuanceModuleAddress: debtIssuanceModuleAddress,
      debtIssuanceModuleV2Address: debtIssuanceModuleV2PolygonAddress,
    })
  }
  return new Set({
    web3Provider: ethersProvider,
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

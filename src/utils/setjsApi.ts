import { provider } from 'web3-core'
import Set from "set.js"
import { SetDetails, StreamingFeeInfo } from "set.js/dist/types/src/types";

import { basicIssuanceModuleAddress, controllerAddress, debtIssuanceModuleAddress, navIssuanceModuleAddress, protocolViewerAddress, streamingFeeModuleAddress, setTokenCreatorAddress, tradeModuleAddress, masterOracleAddress, governanceModuleAddress } from "constants/ethContractAddresses";

export async function getTokenSupply(web3Provider: provider, productAddresses: string[]): Promise<SetDetails[]> {
  if (basicIssuanceModuleAddress === undefined ||
    streamingFeeModuleAddress === undefined ||
    tradeModuleAddress === undefined ||
    debtIssuanceModuleAddress === undefined) {
    throw new Error("A set JS module address is not defined. Please check your .env file")
  }

  const set = getSet(web3Provider);
  const moduleAddresses = [
    basicIssuanceModuleAddress,
    streamingFeeModuleAddress,
    tradeModuleAddress,
    debtIssuanceModuleAddress,
  ];
  return await set.setToken.batchFetchSetDetailsAsync(productAddresses, moduleAddresses);
}

export async function getStreamingFees(web3Provider: provider, productAddresses: string[]): Promise<StreamingFeeInfo[]> {
  const set = getSet(web3Provider);
  return set.fees.batchFetchStreamingFeeInfoAsync(productAddresses);
}

export async function getSetDetails(web3Provider: provider, productAddresses: string[]): Promise<SetDetails[]> {
  if (basicIssuanceModuleAddress === undefined ||
    streamingFeeModuleAddress === undefined ||
    tradeModuleAddress === undefined ||
    debtIssuanceModuleAddress === undefined) {
    throw new Error("A set JS module address is not defined. Please check your .env file")
  }

  const set = getSet(web3Provider);
  const moduleAddresses = [
    basicIssuanceModuleAddress,
    streamingFeeModuleAddress,
    tradeModuleAddress,
    debtIssuanceModuleAddress,
  ];

  return set.setToken.batchFetchSetDetailsAsync(productAddresses, moduleAddresses);
}

function getSet(web3Provider: provider): Set {
  if (basicIssuanceModuleAddress === undefined ||
    controllerAddress === undefined ||
    masterOracleAddress === undefined ||
    navIssuanceModuleAddress === undefined ||
    protocolViewerAddress === undefined ||
    setTokenCreatorAddress === undefined ||
    streamingFeeModuleAddress === undefined ||
    tradeModuleAddress === undefined ||
    governanceModuleAddress === undefined ||
    debtIssuanceModuleAddress === undefined) {
    throw new Error("A set JS address is not defined. Please check your .env file")
  }

  return new Set({
    web3Provider: web3Provider,
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
  });
}

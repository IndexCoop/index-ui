import { provider } from 'web3-core'
import Set from "set.js"
import { basicIssuanceModuleAddress, controllerAddress, debtIssuanceModuleAddress, navIssuanceModuleAddress, protocolViewerAddress, streamingFeeModuleAddress, setTokenCreatorAddress, tradeModuleAddress, masterOracleAddress, governanceModuleAddress, dpiTokenAddress, mviTokenAddress } from "../constants/ethContractAddresses";
import { StreamingFeeInfo } from "set.js/dist/types/src/types";
import { ethers } from "ethers";

export async function getStreamingFees(web3Provider: provider, productAddresses: string[]): Promise<StreamingFeeInfo[]> {
  const set = getSet(web3Provider);
  return set.fees.batchFetchStreamingFeeInfoAsync(productAddresses);
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

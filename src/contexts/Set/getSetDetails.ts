import { provider } from 'web3-core'
import Set from "set.js"
import { basicIssuanceModuleAddress, controllerAddress, debtIssuanceModuleAddress, navIssuanceModuleAddress, protocolViewerAddress, streamingFeeModuleAddress, setTokenCreatorAddress, tradeModuleAddress, masterOracleAddress, governanceModuleAddress, dpiTokenAddress, mviTokenAddress } from "../../constants/ethContractAddresses";
import { SetDetails } from "set.js/dist/types/src/types";

export async function getSetDetails(web3Provider: provider, productAddress: string): Promise<SetDetails[]> {
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

  const set = new Set({
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

  const moduleAddresses = [
    basicIssuanceModuleAddress,
    streamingFeeModuleAddress,
    tradeModuleAddress,
    debtIssuanceModuleAddress,
  ];

  return set.setToken.batchFetchSetDetailsAsync([productAddress], moduleAddresses);
}

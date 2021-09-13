import React from 'react'
import { provider } from 'web3-core'
import Set, { SetJSConfig } from "set.js"

import { basicIssuanceModuleAddress, controllerAddress, debtIssuanceModuleAddress, navIssuanceModuleAddress, protocolViewerAddress, streamingFeeModuleAddress, setTokenCreatorAddress, tradeModuleAddress, masterOracleAddress, governanceModuleAddress, dpiTokenAddress, mviTokenAddress } from "../../constants/ethContractAddresses";
import useWallet from "../../hooks/useWallet";
import SetContext from "./SetContext";

const SetProvider: React.FC = ({ children }) => {
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

  const { ethereum: web3Provider }: { ethereum: provider } = useWallet()
  if ( web3Provider === undefined ){
    console.warn("web3Provider is not defined. Please connect to MetaMask to fetch on-chain Set data");
  }

  let set: Set;
  if (web3Provider) {
    const config: SetJSConfig = {
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
    }
    set = new Set(config);
  }

  async function onLogSetFees() {
      // console.log("logged")
      if (set) {
        // const getPositions: any = await set.setToken.getPositionsAsync(dpiTokenAddress!)
        // const getPositions: any = await set.fees.
        // console.log(getPositions)
        // const erc20 = getPositions[0][0]
        // console.log(set.setToken.batchFetchSetDetailsAsync([dpiTokenAddress!, mviTokenAddress!], []))
      }
  }

  return (
    <SetContext.Provider
      value={{
        onLogSetFees,
      }}
    >
      {children}
    </SetContext.Provider>
  )
}

export default SetProvider

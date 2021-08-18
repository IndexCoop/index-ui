import React, { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'
import Set, { SetJSConfig } from "set.js"

import { basicIssuanceModuleAddress, controllerAddress, debtIssuanceModuleAddress, navIssuanceModuleAddress, protocolViewerAddress, streamingFeeModuleAddress, setTokenCreatorAddress, tradeModuleAddress, masterOracleAddress, governanceModuleAddress } from "../../constants/ethContractAddresses";
import useWallet from "../../hooks/useWallet";
import SetContext from "./SetContext";



const SetProvider: React.FC = ({ children }) => {
  const { ethereum: web3Provider }: { ethereum: provider } = useWallet()
  if ( web3Provider === undefined ){
    console.error("web3Provider is not defined");
    throw new Error("web3Provider is not defined")
  }

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
      throw new Error("A set JS address is not defined")
  }

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

  const set = new Set(config);

  function onLogSetFees() {
      console.log("logged")
      console.log(`set.fees`, set.fees)
  }

  return (
    <SetContext.Provider
      value={{
        // set,
        onLogSetFees,
      }}
    >
      {children}
    </SetContext.Provider>
  )
}

export default SetProvider

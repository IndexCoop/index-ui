import { provider } from 'web3-core'
import Set from "set.js"
import { basicIssuanceModuleAddress, controllerAddress, debtIssuanceModuleAddress, navIssuanceModuleAddress, protocolViewerAddress, streamingFeeModuleAddress, setTokenCreatorAddress, tradeModuleAddress, masterOracleAddress, governanceModuleAddress, dpiTokenAddress, mviTokenAddress } from "../constants/ethContractAddresses";
import { StreamingFeeInfo } from "set.js/dist/types/src/types";
import { ethers } from "ethers";

export async function getStreamingFees(web3Provider: provider, productAddresses: string[]): Promise<StreamingFeeInfo[]> {
  const set = getSet(web3Provider);
  return set.fees.batchFetchStreamingFeeInfoAsync(productAddresses);
}

export async function getStreamingFees2(web3Provider: provider, productAddress: string): Promise<string> {
  if (!streamingFeeModuleAddress) {
    return "no streaming fee module address defined";
  }
  // const abi = JSON.parse('{"status":"1","message":"OK-Missing/Invalid API Key, rate limit of 1/5sec applied","result":"[{\"inputs\":[{\"internalType\":\"contract IController\",\"name\":\"_controller\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"_setToken\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"_managerFee\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"_protocolFee\",\"type\":\"uint256\"}],\"name\":\"FeeActualized\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"_setToken\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"_newFeeRecipient\",\"type\":\"address\"}],\"name\":\"FeeRecipientUpdated\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"_setToken\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"_newStreamingFee\",\"type\":\"uint256\"}],\"name\":\"StreamingFeeUpdated\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"contract ISetToken\",\"name\":\"_setToken\",\"type\":\"address\"}],\"name\":\"accrueFee\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"controller\",\"outputs\":[{\"internalType\":\"contract IController\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"contract ISetToken\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"feeStates\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"feeRecipient\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"maxStreamingFeePercentage\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"streamingFeePercentage\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"lastStreamingFeeTimestamp\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"contract ISetToken\",\"name\":\"_setToken\",\"type\":\"address\"}],\"name\":\"getFee\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"contract ISetToken\",\"name\":\"_setToken\",\"type\":\"address\"},{\"components\":[{\"internalType\":\"address\",\"name\":\"feeRecipient\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"maxStreamingFeePercentage\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"streamingFeePercentage\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"lastStreamingFeeTimestamp\",\"type\":\"uint256\"}],\"internalType\":\"struct StreamingFeeModule.FeeState\",\"name\":\"_settings\",\"type\":\"tuple\"}],\"name\":\"initialize\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"removeModule\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"contract ISetToken\",\"name\":\"_setToken\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_newFeeRecipient\",\"type\":\"address\"}],\"name\":\"updateFeeRecipient\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"contract ISetToken\",\"name\":\"_setToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_newFee\",\"type\":\"uint256\"}],\"name\":\"updateStreamingFee\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]"}')
  console.log('productAddress', productAddress)
  console.log('streamingFeeModuleAddress', streamingFeeModuleAddress)
  const abi = JSON.stringify([{"inputs":[{"internalType":"contract IController","name":"_controller","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_setToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"_managerFee","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_protocolFee","type":"uint256"}],"name":"FeeActualized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_setToken","type":"address"},{"indexed":false,"internalType":"address","name":"_newFeeRecipient","type":"address"}],"name":"FeeRecipientUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_setToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"_newStreamingFee","type":"uint256"}],"name":"StreamingFeeUpdated","type":"event"},{"inputs":[{"internalType":"contract ISetToken","name":"_setToken","type":"address"}],"name":"accrueFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"controller","outputs":[{"internalType":"contract IController","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract ISetToken","name":"","type":"address"}],"name":"feeStates","outputs":[{"internalType":"address","name":"feeRecipient","type":"address"},{"internalType":"uint256","name":"maxStreamingFeePercentage","type":"uint256"},{"internalType":"uint256","name":"streamingFeePercentage","type":"uint256"},{"internalType":"uint256","name":"lastStreamingFeeTimestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract ISetToken","name":"_setToken","type":"address"}],"name":"getFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract ISetToken","name":"_setToken","type":"address"},{"components":[{"internalType":"address","name":"feeRecipient","type":"address"},{"internalType":"uint256","name":"maxStreamingFeePercentage","type":"uint256"},{"internalType":"uint256","name":"streamingFeePercentage","type":"uint256"},{"internalType":"uint256","name":"lastStreamingFeeTimestamp","type":"uint256"}],"internalType":"struct StreamingFeeModule.FeeState","name":"_settings","type":"tuple"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"removeModule","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ISetToken","name":"_setToken","type":"address"},{"internalType":"address","name":"_newFeeRecipient","type":"address"}],"name":"updateFeeRecipient","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ISetToken","name":"_setToken","type":"address"},{"internalType":"uint256","name":"_newFee","type":"uint256"}],"name":"updateStreamingFee","outputs":[],"stateMutability":"nonpayable","type":"function"}])
  let provider = ethers.getDefaultProvider();
  let contract = new ethers.Contract(streamingFeeModuleAddress, abi, provider);
  const feeStates = await contract.feeStates(productAddress);
  console.log(feeStates.streamingFeePercentage.toString());
  return "done"
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

import React, { useState, useEffect } from 'react'
import IndexComponent from "components/IndexComponent"
import SetComponentsContext from "./SetComponentsContext"
import { getSetDetails } from "utils/setjsApi"
import useWallet from "hooks/useWallet"
import { provider } from "web3-core"
import { dpiTokenAddress, mviTokenAddress, bedTokenAddress, eth2xfliTokenAddress, btc2xfliTokenAddress, dataTokenAddress } from "../../constants/ethContractAddresses"
import BigNumber from "bignumber.js"
import { SetComponent } from "./SetComponent"
import { Position } from "set.js/dist/types/src/types"

const SetComponentsProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: provider } = useWallet()
  const [dpiSetComponents, setDpiSetComponents] = useState<SetComponent[]>([])

  useEffect(() => {
    if (ethereum && dpiTokenAddress && mviTokenAddress && bedTokenAddress && eth2xfliTokenAddress && btc2xfliTokenAddress && dataTokenAddress) {
      getSetDetails(ethereum, [dpiTokenAddress, mviTokenAddress, bedTokenAddress, eth2xfliTokenAddress, btc2xfliTokenAddress, dataTokenAddress]).then(result => {
        console.log(result[0])
        setDpiSetComponents(result[0].positions.map(convertPositionToSetComponent))
      })
    }
  }, [ethereum])

  return (
    <SetComponentsContext.Provider
      value={{ dpiSetComponents: dpiSetComponents }}
    >
      {children}
    </SetComponentsContext.Provider>
  )
}

function convertPositionToSetComponent(position: Position): SetComponent {
  return {
    address: position.component,
    quantity: new BigNumber(position.unit.toString()).div(new BigNumber(10).pow(18)).toString()
  }
}

export default SetComponentsProvider

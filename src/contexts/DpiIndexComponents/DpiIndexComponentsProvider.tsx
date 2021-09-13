import React, { useState, useEffect } from 'react'
import { ethers } from "ethers";
import { provider } from 'web3-core'
import DpiIndexComponentsContext from './DpiIndexComponentsContext'
import { fetchSetComponents } from 'utils/tokensetsApi'
import IndexComponent from "../../components/IndexComponent"
import useWallet from "../../hooks/useWallet"
import { getSetDetails } from "../Set/getSetDetails"
import { dpiTokenAddress } from "../../constants/ethContractAddresses"

const DpiIndexComponentsProvider: React.FC = ({ children }) => {
  const [dpiIndexComponents, setDpiIndexComponents] = useState<IndexComponent[]>([])
  const { ethereum }: { ethereum: provider } = useWallet()

  const getDpiDetails = React.useCallback(async () => {
    if (ethereum && dpiTokenAddress){
      const setDetails = await getSetDetails(ethereum, dpiTokenAddress)
      return setDetails[0]
    }
  }, [ethereum])

  const updateDpiIndexComponents = React.useCallback(async (): Promise<void> => {
    const setComponents: IndexComponent[] = await fetchSetComponents('dpi')
    const dpiDetails = await getDpiDetails();

    console.log('setComponents', setComponents)
    console.log('dpiDetails', dpiDetails)
    if (Array.isArray(setComponents) && dpiDetails) {
      const result = setComponents.map(component => {
        const position = dpiDetails.positions.filter(position => position.component === component.address)[0]
        console.log('component pre modification', component)
        const positionWithSetDetails = {...component, quantity: ethers.utils.formatUnits(position.unit)}
        console.log('component post modification', positionWithSetDetails)
        return positionWithSetDetails
      })
      setDpiIndexComponents(result)
    }
    setDpiIndexComponents(setComponents)
  }, [getDpiDetails])

  useEffect(() => {
    updateDpiIndexComponents();
  }, [updateDpiIndexComponents]);

  return (
    <DpiIndexComponentsContext.Provider
      value={{ components: dpiIndexComponents }}
    >
      {children}
    </DpiIndexComponentsContext.Provider>
  )
}

export default DpiIndexComponentsProvider

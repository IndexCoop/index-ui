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
import { Token, useTokenList } from "../../hooks/useTokenList"

const SetComponentsProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: provider } = useWallet()
  const [dpiSetComponents, setDpiSetComponents] = useState<SetComponent[]>([])
  const {tokenList} = useTokenList();

  useEffect(() => {
    if (ethereum && dpiTokenAddress && mviTokenAddress && bedTokenAddress && eth2xfliTokenAddress && btc2xfliTokenAddress && dataTokenAddress && tokenList) {
      getSetDetails(ethereum, [dpiTokenAddress, mviTokenAddress, bedTokenAddress, eth2xfliTokenAddress, btc2xfliTokenAddress, dataTokenAddress]).then(result => {
        console.log(result[0])
        setDpiSetComponents(result[0].positions.map(position => convertPositionToSetComponent(position, tokenList)))
      })
    }
  }, [ethereum, tokenList])

  return (
    <SetComponentsContext.Provider
      value={{ dpiSetComponents: dpiSetComponents }}
    >
      {children}
    </SetComponentsContext.Provider>
  )
}

function convertPositionToSetComponent(position: Position, tokenList: Token[]): SetComponent {
  const token = getTokenForPosition(tokenList, position)

  return {
    address: position.component,
    quantity: new BigNumber(position.unit.toString()).div(new BigNumber(10).pow(18)).toString(),
    symbol: token.symbol,
    name: token.name,
    image: token.logoURI,
    // TODO @rootulp figure out where to fetch these values
    id: 'id',
    totalPriceUsd: 'totalPriceUsd',
    percentOfSet: 'percentOfSet',
  }
}

function getTokenForPosition(tokenList: Token[], position: Position): Token {
  const matchingTokens = tokenList.filter(t => t.address === position.component)
  if (matchingTokens.length === 0) {
    console.warn(`No token for position ${position.component} exists in token lists`)
  } else if (matchingTokens.length > 1) {
    console.warn(`Multiple tokens for position ${position.component} exist in token lists`)
  }
  return matchingTokens[0]
}

export default SetComponentsProvider

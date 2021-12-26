import { useEffect, useState } from 'react'

import { Spacer } from 'react-neu'

import styled from 'styled-components'

import { TokenDataProps } from 'components/ProductPage/ProductDataUI'
import { RoundedButton } from 'components/RoundedButton'
import useChainData from 'hooks/useChainData'
import { MAINNET_CHAIN_DATA, POLYGON_CHAIN_DATA } from 'utils/connectors'

const BuySellDisabled = (props: { tokenData: TokenDataProps }) => {
  const [buttonText, setButtonText] = useState<string>('Switch to Polygon')
  const { chain, setMainnet, setPolygon } = useChainData()

  const switchNetwork = () => {
    if (chain === MAINNET_CHAIN_DATA) setPolygon()
    else if (chain === POLYGON_CHAIN_DATA) setMainnet()
  }

  useEffect(() => {
    if (chain === POLYGON_CHAIN_DATA) setButtonText('Switch to Mainnet')
    else setButtonText('Switch to Polygon')
  }, [chain])

  return (
    <StyledBuySellCard data-cy='buy-sell-selector'>
      <StyledBuySellCardContent>
        <div>
          Purchasing {props.tokenData.token.name} on {chain.name} is currently
          not supported.
        </div>
        <Spacer />
        <RoundedButton text={buttonText} onClick={switchNetwork} />
      </StyledBuySellCardContent>
    </StyledBuySellCard>
  )
}

const StyledBuySellCard = styled.div`
  height: fit-content;
  background-color: ${(props) => props.theme.colors.transparentColors.grey};
  border-radius: ${(props) => props.theme.borderRadius}px;
`

const StyledBuySellCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-bottom: 30px;
`

export default BuySellDisabled

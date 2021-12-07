import React from 'react'
import styled from 'styled-components'

import { TokenDataProps } from 'components/ProductPage/ProductDataUI'
import useChainData from 'hooks/useChainData'

const BuySellDisabled = (props: { tokenData: TokenDataProps }) => {
  const { chain } = useChainData()
  return (
    <StyledBuySellCard data-cy='buy-sell-selector'>
      <StyledBuySellCardContent>
        <div>
          Purchasing {props.tokenData.token.name} on {chain.name} is currently
          not supported.
        </div>
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

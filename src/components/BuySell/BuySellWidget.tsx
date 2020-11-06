import React from 'react'
import styled, { css } from 'styled-components'

import useBuySell from 'hooks/useBuySell'
import { BasicButton } from 'components/BasicButton'
import BuySellSelector from './components/BuySellSelector'
import TokenInputs from './components/TokenInputs'
import OrderSummary from './components/OrderSummary'
import useWallet from 'hooks/useWallet'

const BuyTokenPlaceholder: React.FC = () => {
  const {
    isFetchingOrderData,
    isUserBuying,
    currencyQuantity,
    tokenQuantity,
    uniswapData,
    onExecuteBuySell,
  } = useBuySell()

  const { account, onOpenWalletModal } = useWallet()

  const buttonText = isUserBuying ? 'Buy' : 'Sell'
  const loginRequiredBeforePurchase = uniswapData?.amount_in && !account

  const buySellButton = (
    <BasicButton
      isDisabled={!currencyQuantity || !tokenQuantity}
      isPending={isFetchingOrderData}
      text={loginRequiredBeforePurchase ? 'Login' : buttonText}
      onClick={
        loginRequiredBeforePurchase ? onOpenWalletModal : onExecuteBuySell
      }
    />
  )

  return (
    <StyledBuySellCard>
      <StyledBuySellCardContent>
        <BuySellSelector />
        <TokenInputs />
        <OrderSummary />
        {buySellButton}
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

export default BuyTokenPlaceholder

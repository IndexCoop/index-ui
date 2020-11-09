import React from 'react'
import styled from 'styled-components'

import BigNumber from 'utils/bignumber'
import useBuySell from 'hooks/useBuySell'
import useBalances from 'hooks/useBalances'

const MaxButton: React.FC = () => {
  const {
    isUserBuying,
    selectedCurrency,
    onSetCurrencyQuantity,
    onSetTokenQuantity,
  } = useBuySell()

  const { ethBalance, dpiBalance, daiBalance, usdcBalance } = useBalances()

  const isMaxSpendEnabled =
    !isUserBuying || (isUserBuying && selectedCurrency?.id !== 'wrapped_eth')

  let spendingTokenSymbol = 'ETH'
  let spendingTokenBalance = new BigNumber(0)
  let buttonAction = () => {}

  if (!isUserBuying) {
    spendingTokenSymbol = 'DPI'
    spendingTokenBalance = dpiBalance || new BigNumber(0)
    buttonAction = () => onSetTokenQuantity(spendingTokenBalance.toString())
  } else if (selectedCurrency?.id === 'wrapped_eth') {
    spendingTokenSymbol = selectedCurrency.label
    spendingTokenBalance = ethBalance || new BigNumber(0)
    buttonAction = () => onSetCurrencyQuantity(spendingTokenBalance.toString())
  } else if (selectedCurrency?.id === 'mcd') {
    spendingTokenSymbol = selectedCurrency.label
    spendingTokenBalance = daiBalance || new BigNumber(0)
    buttonAction = () => onSetCurrencyQuantity(spendingTokenBalance.toString())
  } else if (selectedCurrency?.id === 'dai') {
    spendingTokenSymbol = selectedCurrency.label
    spendingTokenBalance = usdcBalance || new BigNumber(0)
    buttonAction = () => onSetCurrencyQuantity(spendingTokenBalance.toString())
  }

  if (isMaxSpendEnabled) {
    return (
      <StyledMaxButton onClick={buttonAction}>
        {spendingTokenBalance.toString()} {spendingTokenSymbol}
      </StyledMaxButton>
    )
  }

  return (
    <StyledMaxSpendableBalance>
      {spendingTokenBalance.toString()} {spendingTokenSymbol}
    </StyledMaxSpendableBalance>
  )
}

const StyledMaxButton = styled.span`
  width: 100%;
  margin-bottom: 20px;
  margin-left: 10px;
  color: ${(props) => props.theme.colors.primary.light};
  cursor: pointer;
`

const StyledMaxSpendableBalance = styled.span`
  width: 100%;
  margin-bottom: 20px;
  margin-left: 10px;
`

export default MaxButton

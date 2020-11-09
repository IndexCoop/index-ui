import React from 'react'
import styled from 'styled-components'

import BigNumber from 'utils/bignumber'
import useBuySell from 'hooks/useBuySell'
import useBalances from 'hooks/useBalances'

const MaxButton: React.FC = () => {
  const { isUserBuying, selectedCurrency } = useBuySell()

  const { ethBalance, dpiBalance, daiBalance, usdcBalance } = useBalances()

  const isMaxSpendEnabled =
    !isUserBuying || (isUserBuying && selectedCurrency?.id !== 'wrapped_eth')

  let spendingTokenSymbol = 'ETH'
  let spendingTokenBalance = new BigNumber(0)

  if (!isUserBuying) {
    spendingTokenSymbol = 'DPI'
    spendingTokenBalance = dpiBalance || new BigNumber(0)
  } else if (selectedCurrency?.id === 'wrapped_eth') {
    spendingTokenSymbol = selectedCurrency.label
    spendingTokenBalance = ethBalance || new BigNumber(0)
  } else if (selectedCurrency?.id === 'mcd') {
    spendingTokenSymbol = selectedCurrency.label
    spendingTokenBalance = daiBalance || new BigNumber(0)
  } else if (selectedCurrency?.id === 'dai') {
    spendingTokenSymbol = selectedCurrency.label
    spendingTokenBalance = usdcBalance || new BigNumber(0)
  }

  if (isMaxSpendEnabled) {
    return (
      <StyledMaxButton>
        {spendingTokenBalance.toString()} {spendingTokenSymbol}
      </StyledMaxButton>
    )
  }

  return (
    <StyledMaxButton>
      {spendingTokenBalance.toString()} {spendingTokenSymbol}
    </StyledMaxButton>
  )
}

const StyledMaxButton = styled.span`
  width: 100%;
  margin-bottom: 20px;
  margin-left: 10px;
`

const StyledSpendableBalance = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-bottom: 30px;
`

export default MaxButton

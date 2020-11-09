import React from 'react'
import styled from 'styled-components'

import BigNumber from 'utils/bignumber'
import useBuySell from 'hooks/useBuySell'
import useBalances from 'hooks/useBalances'

const MaxButton: React.FC = () => {
  const { isUserBuying, selectedCurrency } = useBuySell()

  const { ethBalance, dpiBalance, daiBalance, usdcBalance } = useBalances()

  let spendingTokenSymbol: string
  let spendingTokenBalance: BigNumber | undefined

  if (!isUserBuying) {
    spendingTokenSymbol = 'DPI'
    spendingTokenBalance = dpiBalance
  } else if (selectedCurrency?.id === 'wrapped_eth') {
    spendingTokenSymbol = selectedCurrency.label
    spendingTokenBalance = ethBalance
  } else if (selectedCurrency?.id === 'mcd') {
    spendingTokenSymbol = selectedCurrency.label
    spendingTokenBalance = daiBalance
  } else if (selectedCurrency?.id === 'dai') {
    spendingTokenSymbol = selectedCurrency.label
    spendingTokenBalance = usdcBalance
  }

  return null
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

export default MaxButton

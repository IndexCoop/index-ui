import React from 'react'
import styled from 'styled-components'

import BigNumber from 'utils/bignumber'
import useBuySell from 'hooks/useBuySell'
import useBalances from 'hooks/useBalances'
import useWallet from 'hooks/useWallet'

const MaxButton: React.FC = () => {
  const {
    isUserBuying,
    selectedCurrency,
    uniswapData,
    onSetCurrencyQuantity,
    onSetTokenQuantity,
    onSetActiveField,
  } = useBuySell()

  const { account } = useWallet()

  const { ethBalance, dpiBalance, daiBalance, usdcBalance } = useBalances()

  const isMaxSpendEnabled =
    !isUserBuying || (isUserBuying && selectedCurrency?.id !== 'wrapped_eth')

  let spendingTokenSymbol = 'ETH'
  let spendingTokenBalance = new BigNumber(0)
  let buttonAction = () => {}

  if (!isUserBuying) {
    spendingTokenSymbol = 'DPI'
    spendingTokenBalance = dpiBalance || new BigNumber(0)
    buttonAction = () => {
      onSetActiveField('set')
      onSetTokenQuantity(spendingTokenBalance.toString())
    }
  } else if (selectedCurrency?.id === 'wrapped_eth') {
    spendingTokenSymbol = selectedCurrency.label
    spendingTokenBalance = ethBalance || new BigNumber(0)
    buttonAction = () => {
      onSetActiveField('currency')
      onSetCurrencyQuantity(spendingTokenBalance.toString())
    }
  } else if (selectedCurrency?.id === 'mcd') {
    spendingTokenSymbol = selectedCurrency.label
    spendingTokenBalance = daiBalance || new BigNumber(0)
    buttonAction = () => {
      onSetActiveField('currency')
      onSetCurrencyQuantity(spendingTokenBalance.toString())
    }
  } else if (selectedCurrency?.id === 'usdc') {
    spendingTokenSymbol = selectedCurrency.label
    spendingTokenBalance = usdcBalance || new BigNumber(0)
    buttonAction = () => {
      onSetActiveField('currency')
      onSetCurrencyQuantity(spendingTokenBalance.toString())
    }
  }

  const requiredQuantity = new BigNumber(uniswapData?.amount_in || 0).dividedBy(
    new BigNumber(10).pow(18)
  )
  const userHasSufficientFunds = spendingTokenBalance.isGreaterThanOrEqualTo(
    requiredQuantity
  )

  if (!account) return null

  if (spendingTokenBalance.isLessThanOrEqualTo(0)) {
    return (
      <StyledInsufficientBalance>
        You do not have this token
      </StyledInsufficientBalance>
    )
  }

  if (isMaxSpendEnabled) {
    return (
      <>
        <StyledMaxButton onClick={buttonAction}>
          {spendingTokenBalance.toFixed(5)} {spendingTokenSymbol}
        </StyledMaxButton>
        {!userHasSufficientFunds && (
          <StyledInsufficientBalance>
            Insufficient funds
          </StyledInsufficientBalance>
        )}
      </>
    )
  }

  return (
    <>
      <StyledMaxSpendableBalance>
        {spendingTokenBalance.toFixed(5)} {spendingTokenSymbol}
      </StyledMaxSpendableBalance>
      {!userHasSufficientFunds && (
        <StyledInsufficientBalance>
          Insufficient funds
        </StyledInsufficientBalance>
      )}
    </>
  )
}

const StyledInsufficientBalance = styled.span`
  width: 100%;
  margin-bottom: 20px;
  margin-left: 10px;
  color: ${(props) => props.theme.colors.red};
  cursor: pointer;
`

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

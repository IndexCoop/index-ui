import React from 'react'

import styled from 'styled-components'

import useBuySell from 'hooks/useBuySell'
import useWallet from 'hooks/useWallet'
import BigNumber from 'utils/bignumber'

const MaxButton: React.FC = () => {
  const {
    buySellToken,
    isUserBuying,
    selectedCurrency,
    spendingTokenBalance,
    zeroExTradeData,
    onSetActiveField,
    onSetBuySellQuantity,
  } = useBuySell()

  const { account } = useWallet()

  // Do not allow users to spend maximum ETH quantity due to gas cost complications
  const isMaxSpendDisabled = isUserBuying && selectedCurrency?.label === 'ETH'

  let spendingTokenSymbol = 'ETH'
  let buttonAction = () => {}
  let requiredQuantity = new BigNumber(zeroExTradeData?.maxInput || 0)

  if (!isUserBuying) {
    spendingTokenSymbol = buySellToken.toUpperCase()
    buttonAction = () => {
      onSetActiveField('set')
      onSetBuySellQuantity(spendingTokenBalance.toString())
    }
  } else if (selectedCurrency?.label === 'ETH') {
    spendingTokenSymbol = selectedCurrency.label
    buttonAction = () => {
      onSetActiveField('currency')
      onSetBuySellQuantity(spendingTokenBalance.toString())
    }
  } else if (selectedCurrency?.label === 'DAI') {
    spendingTokenSymbol = selectedCurrency.label
    buttonAction = () => {
      onSetActiveField('currency')
      onSetBuySellQuantity(spendingTokenBalance.toString())
    }
  } else if (selectedCurrency?.label === 'USDC') {
    spendingTokenSymbol = selectedCurrency.label
    buttonAction = () => {
      onSetActiveField('currency')
      onSetBuySellQuantity(spendingTokenBalance.toString())
    }
  }

  const userHasSufficientFunds =
    spendingTokenBalance.isGreaterThanOrEqualTo(requiredQuantity)

  if (!account) return null

  if (spendingTokenBalance.isLessThanOrEqualTo(0)) {
    return (
      <StyledInsufficientBalance>
        You do not have this token
      </StyledInsufficientBalance>
    )
  }

  if (isMaxSpendDisabled) {
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

  return (
    <>
      <StyledMaxButton onClick={buttonAction}>
        Max {spendingTokenBalance.toFixed(5)} {spendingTokenSymbol}
      </StyledMaxButton>
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

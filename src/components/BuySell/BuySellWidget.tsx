import React from 'react'
import styled from 'styled-components'
import Select from 'react-select'

import useBuySell from 'hooks/useBuySell'
import { BasicButton } from 'components/BasicButton'

const BuyTokenPlaceholder: React.FC = () => {
  const {
    isFetchingOrderData,
    isUserBuying,
    activeField,
    selectedCurrency,
    currencyQuantity,
    tokenQuantity,
    currencyOptions,
    uniswapData,
    onToggleIsUserBuying,
    onSetActiveField,
    onSetCurrencyQuantity,
    onSetTokenQuantity,
    onSetSelectedCurrency,
    onExecuteBuySell,
  } = useBuySell()

  const selectStyles = {
    control: (styles: any) => ({
      ...styles,
      width: 100,
      background: 'none',
      border: 'none',
      color: 'white',
      marginRight: -10,
    }),
    singleValue: (styles: any) => ({
      ...styles,
      color: 'white',
      fontWeight: 600,
      fontSize: 20,
      marginLeft: 20,
    }),
    menu: (styles: any) => ({
      ...styles,
      color: 'black',
    }),
    indicatorSeparator: () => ({}),
    indicatorContainer: (styles: any) => ({
      ...styles,
      marginLeft: 0,
      padding: 0,
    }),
  }

  const buySellButtons = isUserBuying ? (
    <>
      <StyledActiveButton>Buy</StyledActiveButton>
      <StyledBuySellButton onClick={onToggleIsUserBuying}>
        Sell
      </StyledBuySellButton>
    </>
  ) : (
    <>
      <StyledBuySellButton onClick={onToggleIsUserBuying}>
        Buy
      </StyledBuySellButton>
      <StyledActiveButton>Sell</StyledActiveButton>
    </>
  )

  const isOrderDataReady = uniswapData?.amount_out > 0 && !isFetchingOrderData

  const orderSummary = isOrderDataReady && (
    <StyledOrderSummaryContainer>
      <StyledOrderSummaryLabel>Minimum Receive</StyledOrderSummaryLabel>
      <StyledOrderSummaryValue>
        {uniswapData?.display?.to_quantity}
      </StyledOrderSummaryValue>

      <StyledOrderSummaryLabel>Price Impact</StyledOrderSummaryLabel>
      <StyledOrderSummaryValue>
        {uniswapData?.display?.slippage}
      </StyledOrderSummaryValue>

      <StyledOrderSummaryLabel>Network Fee</StyledOrderSummaryLabel>
      <StyledOrderSummaryValue>
        {uniswapData?.display?.gas_price_eth}
      </StyledOrderSummaryValue>

      <StyledOrderSummaryLabel>Offered From</StyledOrderSummaryLabel>
      <StyledOrderSummaryValue>Uniswap</StyledOrderSummaryValue>
    </StyledOrderSummaryContainer>
  )

  return (
    <StyledBuySellCard>
      <StyledBuySellCardContent>
        <StyledCardHeader>{buySellButtons}</StyledCardHeader>

        <StyledCurrencyContainer>
          <StyledCurrencyContainerLabel>Pay with</StyledCurrencyContainerLabel>
          <StyledCurrencySelectWrapper>
            <StyledInputField
              value={currencyQuantity}
              type='number'
              min='0'
              step='0.01'
              onChange={onSetCurrencyQuantity}
              onFocus={() => onSetActiveField('currency')}
            />
            <Select
              value={selectedCurrency}
              options={currencyOptions}
              styles={selectStyles}
              onChange={onSetSelectedCurrency}
            />
          </StyledCurrencySelectWrapper>
        </StyledCurrencyContainer>

        <StyledCurrencyContainer>
          <StyledCurrencyContainerLabel>
            Buy (estimated)
          </StyledCurrencyContainerLabel>
          <StyledCurrencySelectWrapper>
            <StyledInputField
              value={tokenQuantity}
              type='number'
              min='0'
              step='0.01'
              onChange={onSetTokenQuantity}
              onFocus={() => onSetActiveField('set')}
            />
            <StyledTargetTokenSymbol>DPI</StyledTargetTokenSymbol>
          </StyledCurrencySelectWrapper>
        </StyledCurrencyContainer>

        {orderSummary}

        <BasicButton
          isDisabled={currencyQuantity <= 0 && tokenQuantity <= 0}
          isPending={isFetchingOrderData}
          text={'Buy'}
          onClick={onExecuteBuySell}
        />
      </StyledBuySellCardContent>
    </StyledBuySellCard>
  )
}

const StyledBuySellCard = styled.div`
  background-color: ${(props) => props.theme.colors.transparentColors.grey};
  border-radius: ${(props) => props.theme.borderRadius}px;
`

const StyledBuySellCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`

const StyledCardHeader = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const StyledBuySellButton = styled.button`
  width: 50%;
  color: white;
  background: none;
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-bottom: 2px solid white;
  padding-bottom: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.grey[400]};
    border-bottom: 2px solid ${(props) => props.theme.colors.grey[400]};
  }
`

const StyledActiveButton = styled.button`
  width: 50%;
  color: ${(props) => props.theme.colors.primary.light};
  background: none;
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary.light};
  padding-bottom: 20px;
  margin-bottom: 20px;
  cursor: pointer;
`

const StyledCurrencyContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  background-color: ${(props) => props.theme.colors.transparentColors.grey};
  border-radius: ${(props) => props.theme.borderRadius}px;
  padding: 10px 20px;
  margin-bottom: 20px;
`

const StyledCurrencyContainerLabel = styled.div`
  font-size: 14px;
`

const StyledCurrencySelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledInputField = styled.input`
  font-size: 20px;
  width: 50%;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
  padding: 0px;
  border-radius: 4px;
  background: none;
  border: none;
  &:focus {
    outline: none;
  }
`

const StyledTargetTokenSymbol = styled.span`
  font-size: 20px;
  font-weight: 600;
`

const StyledOrderSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const StyledOrderSummaryLabel = styled.span`
  font-size: 14px;
  margin-bottom: 5px;
`

const StyledOrderSummaryValue = styled.span`
  font-size: 20px;
  margin-bottom: 20px;
`

export default BuyTokenPlaceholder

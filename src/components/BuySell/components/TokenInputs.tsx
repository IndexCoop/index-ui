import React, { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import Select from 'react-select'

import useBuySell from 'hooks/useBuySell'
import MaxButton from './MaxButton'

const TokenInputs: React.FC = () => {
  const {
    isUserBuying,
    activeField,
    selectedCurrency,
    currencyQuantity,
    tokenQuantity,
    currencyOptions,
    uniswapData,
    onSetActiveField,
    onSetCurrencyQuantity,
    onSetTokenQuantity,
    onSetSelectedCurrency,
  } = useBuySell()

  const currencyInputRef = useRef<any>()
  const setTokenInputRef = useRef<any>()

  useEffect(() => {
    if (activeField === 'currency' && currencyInputRef) {
      currencyInputRef?.current?.focus()
    }

    if (activeField === 'set' && setTokenInputRef) {
      setTokenInputRef?.current?.focus()
    }
  }, [activeField])

  const tokenPaymentOptions = currencyOptions.map((token: any) => ({
    ...token,
    value: token.id,
  }))

  if (isUserBuying) {
    return (
      <>
        <StyledCurrencyContainer
          isActive={activeField === 'currency'}
          onClick={() => onSetActiveField('currency')}
        >
          <StyledCurrencyLabelWrapper>
            <StyledCurrencyLabel>Pay with</StyledCurrencyLabel>
            <StyledCurrencyLabel>
              {uniswapData?.display?.input_value_usd}
            </StyledCurrencyLabel>
          </StyledCurrencyLabelWrapper>
          <StyledCurrencySelectWrapper>
            <StyledInputField
              ref={currencyInputRef}
              value={currencyQuantity}
              type='number'
              min='0'
              step='0.01'
              placeholder='0'
              onChange={(e) => onSetCurrencyQuantity(e.target.value)}
              onFocus={() => onSetActiveField('currency')}
            />
            <Select
              value={selectedCurrency}
              options={tokenPaymentOptions}
              styles={dropdownSelectStyles}
              onChange={onSetSelectedCurrency}
            />
          </StyledCurrencySelectWrapper>
        </StyledCurrencyContainer>

        <MaxButton />

        <StyledCurrencyContainer
          isActive={activeField === 'set'}
          onClick={() => onSetActiveField('set')}
        >
          <StyledTokenLabelWrapper>
            <StyledCurrencyLabel>Buy (estimated)</StyledCurrencyLabel>
            <StyledCurrencyLabel>
              {uniswapData?.display?.output_value_usd}
            </StyledCurrencyLabel>
          </StyledTokenLabelWrapper>
          <StyledCurrencySelectWrapper>
            <StyledInputField
              ref={setTokenInputRef}
              value={tokenQuantity}
              type='number'
              min='0'
              step='0.01'
              placeholder='0'
              onChange={(e) => onSetTokenQuantity(e.target.value)}
              onFocus={() => onSetActiveField('set')}
            />
            <StyledTargetTokenSymbol>DPI</StyledTargetTokenSymbol>
          </StyledCurrencySelectWrapper>
        </StyledCurrencyContainer>
      </>
    )
  }

  return (
    <>
      <StyledCurrencyContainer
        isActive={activeField === 'set'}
        onClick={() => onSetActiveField('set')}
      >
        <StyledTokenLabelWrapper>
          <StyledCurrencyLabel>Sell</StyledCurrencyLabel>
          <StyledCurrencyLabel>
            {uniswapData?.display?.input_value_usd}
          </StyledCurrencyLabel>
        </StyledTokenLabelWrapper>
        <StyledCurrencySelectWrapper>
          <StyledInputField
            ref={setTokenInputRef}
            value={tokenQuantity}
            type='number'
            min='0'
            step='0.01'
            placeholder='0'
            onChange={(e) => onSetTokenQuantity(e.target.value)}
            onFocus={() => onSetActiveField('set')}
          />
          <StyledTargetTokenSymbol>DPI</StyledTargetTokenSymbol>
        </StyledCurrencySelectWrapper>
      </StyledCurrencyContainer>

      <MaxButton />

      <StyledCurrencyContainer
        isActive={activeField === 'currency'}
        onClick={() => onSetActiveField('currency')}
      >
        <StyledCurrencyLabelWrapper>
          <StyledCurrencyLabel>Receive (estimated)</StyledCurrencyLabel>
          <StyledCurrencyLabel>
            {uniswapData?.display?.output_value_usd}
          </StyledCurrencyLabel>
        </StyledCurrencyLabelWrapper>

        <StyledCurrencySelectWrapper>
          <StyledInputField
            ref={currencyInputRef}
            value={currencyQuantity}
            type='number'
            min='0'
            step='0.01'
            placeholder='0'
            onChange={(e) => onSetCurrencyQuantity(e.target.value)}
            onFocus={() => onSetActiveField('currency')}
          />
          <Select
            value={selectedCurrency}
            options={tokenPaymentOptions}
            styles={dropdownSelectStyles}
            onChange={onSetSelectedCurrency}
          />
        </StyledCurrencySelectWrapper>
      </StyledCurrencyContainer>
    </>
  )
}

const dropdownSelectStyles = {
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

interface CurrencyContainerProps {
  isActive?: boolean
}

const StyledCurrencyContainer = styled.div<CurrencyContainerProps>`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 20px;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.colors.transparentColors.grey};
  border-radius: ${(props) => props.theme.borderRadius}px;
  cursor: pointer;

  ${(props) =>
    props.isActive &&
    css`
      background-color: transparent;
      border: 1px solid ${props.theme.colors.transparentColors.grey};
    `}
`

const StyledCurrencyLabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -5px;
`

const StyledTokenLabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledCurrencyLabel = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`

const StyledCurrencySelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledInputField = styled.input`
  font-size: 20px;
  width: 70%;
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

export default TokenInputs
